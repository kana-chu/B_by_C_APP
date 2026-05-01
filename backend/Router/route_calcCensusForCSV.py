"""
@component Mod_Api_Calc_Census_CSV
@folder backend/Router
@category API
@description
    国勢調査・経済センサス 共用 Census 計算 API（CSV 高速出力版）
    - 見た目整形なし
    - 各項目を「項目名.csv」として指定フォルダに生成
    - SSE 進捗対応
"""

from fastapi import APIRouter, HTTPException, Depends, Query
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from datetime import datetime
import os
import json
import pandas as pd

# ===== Feature =====
from Feature.calcCensus.f_cC_readItemList import f_cC_readItemList
from Feature.calcCensus.f_cC_concatSameItem import f_cC_concatSameItem
from Feature.calcCensus.f_cC_prepareItemDf import f_cC_prepareItemDf
from Feature.calcCensus.f_cC_readMeshDf import f_cC_readMeshDf
from Feature.calcCensus.f_cC_run_fast_csv import f_cC_run_fast_csv
from Feature.calcCensus.export_csv.export_csv_files import export_csv_files

router = APIRouter(prefix="/calc-census", tags=["calc-census-csv"])

# ==================================================
# Request Model（Excel版と同一）
# ==================================================
class CalcCensusRequest(BaseModel):
    file_path: str
    rate_sheet: str
    item_sheet: str
    data_sheet_List: list[str]
    census_meshSize: str
    ex_meshSize: str
    save_path: str   # CSV版では「出力先フォルダ」

# ==================================================
# GET Query → Request Model
# ==================================================
def get_calc_census_request(
    file_path: str = Query(...),
    rate_sheet: str = Query(...),
    item_sheet: str = Query(...),
    data_sheet_List: str = Query(...),
    census_meshSize: str = Query(...),
    ex_meshSize: str = Query(...),
    save_path: str = Query(...),
) -> CalcCensusRequest:
    return CalcCensusRequest(
        file_path=os.path.normpath(file_path),
        rate_sheet=rate_sheet,
        item_sheet=item_sheet,
        data_sheet_List=data_sheet_List.split(","),
        census_meshSize=census_meshSize,
        ex_meshSize=ex_meshSize,
        save_path=os.path.normpath(save_path),
    )

# ==================================================
# CSV 高速実行（SSE）
# ==================================================
@router.get("/execute-csv")
def calc_census_csv(req: CalcCensusRequest = Depends(get_calc_census_request)):

    # 元データ Excel の存在チェック
    if not os.path.isfile(req.file_path):
        raise HTTPException(400, "元データ Excel ファイルが存在しません")

    def event_stream():
        start_time = datetime.now()

        def send(message: str, progress: int):
            payload = {"message": message, "progress": progress}
            yield f"data: {json.dumps(payload, ensure_ascii=False)}\n\n"

        # --------------------------------------------------
        # 開始
        # --------------------------------------------------
        yield from send(
            f"CSV 高速モード計算開始\n開始時刻: {start_time:%Y-%m-%d %H:%M:%S}",
            0,
        )

        # --------------------------------------------------
        # 1. 項目定義読み込み
        # --------------------------------------------------
        yield from send("📄 項目定義読み込み中…", 5)
        item_list = f_cC_readItemList(
            req.file_path,
            req.item_sheet,
        )["itemList"]

        if not item_list:
            raise HTTPException(400, "項目が空です")

        # --------------------------------------------------
        # 2. データ結合
        # --------------------------------------------------
        yield from send("📊 データ結合中…", 15)
        df = f_cC_concatSameItem(
            req.file_path,
            req.data_sheet_List,
            item_list,
            economicMeshSize=int(req.census_meshSize),
        )
        df = f_cC_prepareItemDf(df)

        # --------------------------------------------------
        # 3. メッシュ定義読み込み
        # --------------------------------------------------
        yield from send("🧮 メッシュ定義読み込み中…", 25)
        df_mesh = f_cC_readMeshDf(req.file_path)

        # --------------------------------------------------
        # 4. 割合シート読み込み
        # --------------------------------------------------
        yield from send("📈 割合データ準備中…", 35)
        rate_df = pd.read_excel(
            req.file_path,
            sheet_name=req.rate_sheet,
            header=None,
            engine="openpyxl",
        )
        rate_vals = rate_df.iloc[4:, 4:].to_numpy(dtype=float)

        # --------------------------------------------------
        # 5. 高速計算（メモリ上）
        # --------------------------------------------------
        yield from send("🚀 メッシュ計算＋割合適用中…", 70)
        data = f_cC_run_fast_csv(
            df=df,
            df_mesh=df_mesh,
            rate_vals=rate_vals,
            item_list=item_list,
            req=req,
        )

        # --------------------------------------------------
        # 6. CSV 出力（フォルダ作成含む）
        # --------------------------------------------------
        yield from send("📤 CSV ファイル書き出し中…", 90)
        export_csv_files(
            output_dir=req.save_path,
            data=data,
        )

        # --------------------------------------------------
        # 完了
        # --------------------------------------------------
        end_time = datetime.now()
        elapsed = end_time - start_time

        yield from send(
            (
                "CSV 高速モード完了\n\n"
                f"開始時刻: {start_time:%Y-%m-%d %H:%M:%S}\n"
                f"終了時刻: {end_time:%Y-%m-%d %H:%M:%S}\n"
                f"処理時間: {elapsed}"
            ),
            100,
        )

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
    )
