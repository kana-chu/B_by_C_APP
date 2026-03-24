"""
@component Mod_Api_Dat_ChangeScale_Backend
@folder backend/Router
@category API
@description
    Electron → React → FastAPI のフローで送られてきた
    絶対パスの dat ファイルを読み込み、
    等倍計算（今後実装）を行うエンドポイント。

@params
    file_path   : 絶対パス（例: C:/data/input.dat）
    save_path   : 絶対パス（保存先）
    start_date  : データ範囲（開始）
    end_date    : データ範囲（終了）
    calc_start  : 本計算開始
    calc_end    : 本計算終了
    multiplier  : 倍率

@return
    dict: メッセージ、ブロック数などを返す。
"""

from fastapi import APIRouter, Form
from Feature.F_ReadDatFile import F_ReadDatFile

router = APIRouter(prefix="/dat", tags=["dat"])


@router.post("/change-scale")
async def change_scale(
    file_path: str = Form(...),
    save_path: str = Form(...),
    start_date: str = Form(...),
    end_date: str = Form(...),
    calc_start: str = Form(...),
    calc_end: str = Form(...),
    multiplier: float = Form(...)
):
    """
    Dat 等倍計算 API
    絶対パスで渡された dat ファイルを読み込み、処理結果を返す。
    """

    # 1. dat ファイルの読み込み
    try:
        dfs = F_ReadDatFile(file_path)   # ★ 渡された絶対パスで読み込む
    except Exception as e:
        return {
            "message": f"dat ファイルを読み込めませんでした: {file_path}",
            "error": str(e)
        }

    # TODO: ここにスケール計算を後で実装
    # F_ChangeScale(dfs, multiplier, ...)

    # 返すデータ例
    return {
        "message": "処理が完了しました",
        "blocks": len(dfs),
        "secondsList": [],  # 必要なら抽出処理を書く
        "params": {
            "file_path": file_path,
            "save_path": save_path,
            "start_date": start_date,
            "end_date": end_date,
            "calc_start": calc_start,
            "calc_end": calc_end,
            "multiplier": multiplier,
        }
    }