"""
@component Mod_Api_Calc_Census
@folder backend/Router
@category API
@description
    国勢調査・経済センサス 共用 Census 計算 API (excel高速版)
    ※ 入力値はすべてフロントから受け取る（規定値なし）
"""

from fastapi import APIRouter, HTTPException, Body, Request, Depends, Query
from pydantic import BaseModel
import os
import json
import pandas as pd
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
from Feature.calcCensus.f_cC_run_fast import f_cC_run_fast

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
            payload = {"message": message, "progress": progress}
            yield f"data: {json.dumps(payload, ensure_ascii=False)}\n\n"

        # ==================================================
        # 開始
        # ==================================================
        yield from send(
            f"計算開始\n開始日時: {start_time:%Y-%m-%d %H:%M:%S}",
            0,
        )

        # ==================================================
        # 0. Excel コピー
        # ==================================================
        yield from send("📁 Excel ファイル生成中…", 1)
        f_cC_createOutputWorkbook(
            src_path=req.file_path,
            dest_path=req.save_path,
        )

        # ==================================================
        # 1. 項目定義
        # ==================================================
        yield from send("📄 項目一覧取得中…", 2)
        item_list = f_cC_readItemList(
            req.file_path,
            req.item_sheet,
        )["itemList"]

        if not item_list:
            raise ValueError("項目が空です")

        # ==================================================
        # 2. シート生成
        # ==================================================
        yield from send("📑 各項目シート作成中…", 5)
        f_cC_createEachSheet(req.save_path, item_list)

        # ==================================================
        # 3. データ結合
        # ==================================================
        yield from send("📊 データ結合中…", 10)
        df = f_cC_concatSameItem(
            req.file_path,
            req.data_sheet_List,
            item_list,
            economicMeshSize=int(req.census_meshSize),
        )
        df = f_cC_prepareItemDf(df)

        # ==================================================
        # 4. fast ルート本体
        # ==================================================
        yield from send("🚀 高速モードで計算中…", 15)

        df_mesh = f_cC_readMeshDf(req.save_path)

        # 割合データ準備（1回）
        rate_df = pd.read_excel(
            req.save_path,
            sheet_name=req.rate_sheet,
            header=None,
            engine="openpyxl",
        )
        rate_vals = rate_df.iloc[4:, 4:].to_numpy(dtype=float)

        print("f_cC_run_fastするはず")
        f_cC_run_fast(
            df=df,
            df_mesh=df_mesh,
            rate_vals=rate_vals,
            item_list=item_list,
            req=req,
        )

        # ==================================================
        # 5. 見た目整形
        # ==================================================
        # yield from send("🧾 見出し・罫線整形中…", 85)
        # f_cC_copyMeshHeaderStyle(
        #     file_path=req.save_path,
        #     item_sheetNames=[i["sheetName"] for i in item_list],
        #     exMeshSize=int(req.ex_meshSize),
        # )

        # ==================================================
        # 6. 0埋め・着色
        # ==================================================
        # yield from send("🎨 空セルを0で埋めています…", 95)
        # f_cC_fillZeroCellsGray(
        #     file_path=req.save_path,
        #     sheet_names=[i["sheetName"] for i in item_list],
        # )

        # ==================================================
        # 完了
        # ==================================================
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

    return StreamingResponse(event_stream(), media_type="text/event-stream")


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
