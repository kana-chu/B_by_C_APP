"""
@component Mod_Api_Calc_Census
@folder backend/Router
@category API
@description
    国勢調査・経済センサス 共用 Census 計算 API
    ※ 入力値はすべてフロントから受け取る（規定値なし）
"""

from fastapi import APIRouter, HTTPException, Body, Request, Depends, Query
from pydantic import BaseModel
import os
import json
from datetime import datetime
from fastapi.responses import StreamingResponse
from typing import List


# ===== Feature =====
from Feature.calcCensus.f_cC_createOutputWorkbook import f_cC_createOutputWorkbook
from Feature.calcCensus.f_cC_readItemList import f_cC_readItemList
from Feature.calcCensus.f_cC_createEachSheet import f_cC_createEachSheet
from Feature.calcCensus.f_cC_concatSameItem import f_cC_concatSameItem
from Feature.calcCensus.f_cC_prepareItemDf import f_cC_prepareItemDf
from Feature.calcCensus.f_cC_readMeshDf import f_cC_readMeshDf
from Feature.calcCensus.f_cC_calcMeshCellNo import f_cC_calcMeshCellNo
from Feature.calcCensus.f_cC_matchMeshIndex import f_cC_matchMeshIndex
from Feature.calcCensus.f_cC_writeItemToExcel import f_cC_writeItemToExcel
from Feature.calcCensus.f_cC_multiplyPercentage import f_cC_multiplyPercentage
from Feature.calcCensus.f_cC_readXlsxSheetName import f_cC_readXlsxSheetName
from Feature.calcCensus.f_cC_copyMeshHeaderStyle import f_cC_copyMeshHeaderStyle
from Feature.calcCensus.f_cC_fillZeroCellsGray import f_cC_fillZeroCellsGray

print("🔥🔥🔥 ROUTE_CALC_CENSUS (FRONT-DRIVEN) LOADED 🔥🔥🔥", __file__)

router = APIRouter(prefix="/calc-census", tags=["calc-census"])


# ==================================================
# Request Model（フロント state と 1:1）
# ==================================================
class CalcCensusRequest(BaseModel):
    file_path: str
    rate_sheet: str
    item_sheet: str
    data_sheet_List: list[str]
    census_meshSize: str
    ex_meshSize: str
    save_path: str


def get_calc_census_request(
    file_path: str = Query(...),
    rate_sheet: str = Query(...),
    item_sheet: str = Query(...),
    data_sheet_List: str = Query(...),  # ← 文字列で受ける
    census_meshSize: str = Query(...),
    ex_meshSize: str = Query(...),
    save_path: str = Query(...),
) -> CalcCensusRequest:
    return CalcCensusRequest(
        file_path=file_path,
        rate_sheet=rate_sheet,
        item_sheet=item_sheet,
        data_sheet_List=data_sheet_List.split(","),  # ✅ ここで分割
        census_meshSize=census_meshSize,
        ex_meshSize=ex_meshSize,
        save_path=save_path,
    )


# ==================================================
# Census 計算 実行
# ==================================================
@router.get("/execute")
def calc_census(req: CalcCensusRequest = Depends(get_calc_census_request)):
    if not os.path.isfile(req.file_path):
        raise HTTPException(400, "元データ Excel ファイルが存在しません")

    def event_stream():
        start_time = datetime.now()

        def send(message: str, progress: int):
            payload = {
                "message": message,
                "progress": progress,
            }
            yield f"data: {json.dumps(payload, ensure_ascii=False)}\n\n"

        # ============================================
        # 開始
        # ============================================
        yield from send(
            f"計算開始\n開始日時: {start_time:%Y-%m-%d %H:%M:%S}",
            0,
        )

        # ============================================
        # 0.5 出力 Excel 生成
        # ============================================
        yield from send("📁 Excel ファイル生成中…", 1)
        f_cC_createOutputWorkbook(
            src_path=req.file_path,
            dest_path=req.save_path,
        )

        # ============================================
        # 1. 項目定義読み込み
        # ============================================
        yield from send(f"計算開始時刻：{start_time:%Y-%m-%d %H:%M:%S}\n📄 項目読み込み中…", 2)
        item_list = f_cC_readItemList(
            req.file_path,
            req.item_sheet,
        )["itemList"]

        if not item_list:
            raise ValueError("項目が空です")

        # ============================================
        # 2. 各項目シート作成
        # ============================================
        yield from send(f"計算開始時刻：{start_time:%Y-%m-%d %H:%M:%S}\n📑 各項目シート作成中…", 5)
        created = f_cC_createEachSheet(
            req.save_path,
            item_list
        )["createdSheets"]

        # ============================================
        # 3. データ結合
        # ============================================
        yield from send(f"計算開始時刻：{start_time:%Y-%m-%d %H:%M:%S}\n📊 データ結合中…", 10)
        df = f_cC_concatSameItem(
            req.file_path,
            req.data_sheet_List,
            item_list,
            economicMeshSize=int(req.census_meshSize),
        )
        df = f_cC_prepareItemDf(df)

        # ============================================
        # 4. メッシュ登録
        # ============================================
        total_items = len(item_list)

        yield from send(f"計算開始時刻：{start_time:%Y-%m-%d %H:%M:%S}\n✏️ 各シートにデータを反映します…", 10)

        df_mesh = f_cC_readMeshDf(req.save_path)

        item_write_tasks = {
            item["sheetName"]: []
            for item in item_list
        }

        col_index_map = {
            col: i for i, col in enumerate(df.columns)
        }

        # --- データ集計（進捗を動かさない） ---
        for row in df.itertuples(index=False):
            x_cells, y_cells = f_cC_calcMeshCellNo(
                row[3], row[4],
                req.census_meshSize,
                req.ex_meshSize,
            )

            y_idx, x_idx = f_cC_matchMeshIndex(
                df_mesh=df_mesh,
                x_cells=x_cells,
                y_cells=y_cells,
                d2=str(int(row[1])).zfill(2),
                base=str(int(row[2])).zfill(2),
            )

            for item in item_list:
                col_idx = col_index_map[item["sheetName"]]
                item_write_tasks[item["sheetName"]].append(
                    (y_idx, x_idx, row[col_idx])
                )

        # --- シートごとに書き込み + 進捗更新 ---
        step = 60 / total_items
        current_progress = 10

        for idx, (sheet_name, tasks) in enumerate(item_write_tasks.items(), start=1):
            f_cC_writeItemToExcel(
                file_path=req.save_path,
                item_write_tasks={sheet_name: tasks},
            )

            current_progress = 10 + round(step * idx)
            if current_progress > 70:
                current_progress = 70

            yield from send(
                f"計算開始時刻：{start_time:%Y-%m-%d %H:%M:%S}\n✏️ 各シートにデータを反映しています…：{sheet_name}（{idx}/{total_items}）",
                current_progress,
            )

        # 念のため最終補正
        yield from send("✏️ 各シートにデータを反映しました", 70)

        # ============================================
        # 5. 割合掛け（シート別進捗）
        # ============================================
        start_p, end_p = 70, 85
        item_names = [item["sheetName"] for item in item_list]
        total = len(item_names)
        step = (end_p - start_p) / total

        current = start_p
        yield from send(f"計算開始時刻：{start_time:%Y-%m-%d %H:%M:%S}\n📈 割合反映処理を開始します", current)

        for idx, sheet in enumerate(item_names, start=1):
            yield from send(
                f"📈 割合を掛けています：{sheet}（{idx}/{total}）",
                current,
            )
            f_cC_multiplyPercentage(
                file_path=req.save_path,
                percentage_sheetName=req.rate_sheet,
                item_sheetNames=[sheet],  # ★ 1枚ずつ
            )

            current = start_p + round(step * idx)
            if current > end_p:
                current = end_p

        yield from send(f"計算開始時刻：{start_time:%Y-%m-%d %H:%M:%S}\n📈 割合反映処理が完了しました", end_p)

        # ============================================
        # 6. 見た目整形（シート別進捗）
        # ============================================
        start_p, end_p = 85, 95
        total = len(item_names)
        step = (end_p - start_p) / total

        current = start_p
        yield from send(f"計算開始時刻：{start_time:%Y-%m-%d %H:%M:%S}\n🧾 見出し・罫線を整えます…", current)

        for idx, sheet in enumerate(item_names, start=1):
            yield from send(
                f"🧾 整形中：{sheet}（{idx}/{total}）",
                current,
            )
            f_cC_copyMeshHeaderStyle(
                file_path=req.save_path,
                item_sheetNames=[sheet],  # ★ 1枚ずつ
                exMeshSize=int(req.ex_meshSize),
            )

            current = start_p + round(step * idx)
            if current > end_p:
                current = end_p

        yield from send(f"計算開始時刻：{start_time:%Y-%m-%d %H:%M:%S}\n🧾 見出し・罫線を整えました", end_p)

        # ============================================
        # 7. 0埋め・着色（シート別進捗）
        # ============================================
        start_p, end_p = 95, 100
        total = len(item_names)
        step = (end_p - start_p) / total

        current = start_p
        yield from send(f"計算開始時刻：{start_time:%Y-%m-%d %H:%M:%S}\n🎨 空セルを0で埋めます…", current)

        for idx, sheet in enumerate(item_names, start=1):
            yield from send(
                f"🎨 空セル処理中：{sheet}（{idx}/{total}）",
                current,
            )
            f_cC_fillZeroCellsGray(
                file_path=req.save_path,
                sheet_names=[sheet],  # ★ 1枚ずつ
            )

            current = start_p + round(step * idx)
            if current > end_p:
                current = end_p

        yield from send(f"計算開始時刻：{start_time:%Y-%m-%d %H:%M:%S}\n🎨 全空セルを0で埋めました", end_p)

        # ============================================
        # 完了
        # ============================================
        end_time = datetime.now()
        elapsed = end_time - start_time

        yield from send(
            (
                "Census 計算が完了しました\n\n"
                f"計算開始時刻: {start_time:%Y-%m-%d %H:%M:%S}\n"
                f"計算終了時刻: {end_time:%Y-%m-%d %H:%M:%S}\n"
                f"処理時間: {elapsed}"
            ),
            100,
        )

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
    )


# ==================================================
# Inspect : Sheet Names
# ==================================================
class InspectSheetNameRequest(BaseModel):
    file_path: str


@router.post("/inspect-sheet-names")
async def inspect_sheet_names(req: InspectSheetNameRequest = Body(...)):
    """
    Excel ファイル内のシート名一覧を返す
    （フロント：F_Api_CC_SheetNameInspect）
    """
    try:
        result = f_cC_readXlsxSheetName(req.file_path)
        return {
            "sheetNameList": result["sheet_names"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==================================================
# Inspect : Item Sheet
# ==================================================
class InspectItemSheetRequest(BaseModel):
    file_path: str
    sheet_name: str


@router.post("/inspect-item-sheet")
async def inspect_item_sheet(req: InspectItemSheetRequest = Body(...)):
    """
    項目シートの中身（itemList）を返す
    （フロント：F_Api_CC_SheetItemInspect）
    """
    try:
        result = f_cC_readItemList(
            req.file_path,
            req.sheet_name,
        )
        return {
            "itemList": result["itemList"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
