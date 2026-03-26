"""
@component Mod_Api_Dat_ChangeScale_Backend
@folder backend/Router
@category API
@description
    Electron → React → FastAPI のフローで送られた dat ファイルを処理する。
    - dat 読み込み
    - 秒ベースでブロック範囲抽出
    - 指定倍率でデータ部のみスケール変換
    - 元ブロックに差し替え
    - TAB区切り .dat として保存
"""

from fastapi import APIRouter, Form

from Feature.F_BuildDatBlockInfo import F_BuildDatBlockInfo
from Feature.F_FilterBlockByRange import F_FilterBlockByRange
from Feature.F_ChangeScale import F_ChangeScale
from Feature.F_SaveChangedDatFile import F_SaveChangedDatFile

router = APIRouter(prefix="/dat", tags=["dat"])


# ======================================================
# ▼ change-scale（メイン処理）
# ======================================================
@router.post("/change-scale")
async def change_scale(
    file_path: str = Form(...),
    save_path: str = Form(...),
    start_date: str = Form(...),
    end_date: str = Form(...),     # ※ 仕様上受け取るが、現時点では未使用
    calc_start: str = Form(...),   # 秒（UIで選択された block.seconds）
    calc_end: str = Form(...),
    multiplier: str = Form(...)
):
    """
    Dat 等倍計算 API（完成版）
    処理フロー:
      1. dat → ブロック構造化
      2. seconds 範囲で対象ブロック抽出
      3. multiplier を掛けてスケール変換
      4. 元ブロックに差し替え
      5. TAB区切り .dat として保存
    """

    # --------------------------------------------------
    # 1. dat → ブロック構造化
    # --------------------------------------------------
    try:
        blocks = F_BuildDatBlockInfo(file_path, start_date)
    except Exception as e:
        return {
            "message": "dat ファイルを読み込めませんでした",
            "error": str(e),
        }

    total_blocks = len(blocks)

    # --------------------------------------------------
    # 2. 秒ベースで範囲抽出
    # --------------------------------------------------
    try:
        calc_start_sec = int(calc_start)
        calc_end_sec = int(calc_end)
    except Exception:
        return {
            "message": "calc_start / calc_end を数値に変換できません",
            "calc_start": calc_start,
            "calc_end": calc_end,
        }

    target_blocks = F_FilterBlockByRange(
        blocks,
        calc_start_sec,
        calc_end_sec
    )

    # --------------------------------------------------
    # 3. スケール変換（小数1桁切り上げ・整数化）
    # --------------------------------------------------
    try:
        scaled_result = F_ChangeScale(target_blocks, multiplier)
    except Exception as e:
        return {
            "message": "スケール変換に失敗しました",
            "error": str(e),
        }

    scaled_blocks = scaled_result["result_blocks"]

    # --------------------------------------------------
    # 4. 元ブロックに差し替え → 保存
    # --------------------------------------------------
    save_result = F_SaveChangedDatFile(
        original_blocks=blocks,
        scaled_blocks=scaled_blocks,
        save_path=save_path,
    )

    # --------------------------------------------------
    # 5. レスポンス
    # --------------------------------------------------
    return {
        "message": "OK",
        "total_blocks": total_blocks,
        "target_blocks": len(target_blocks),
        "multiplier": scaled_result["multiplier"],  # フロントログ用
        "seconds_range": {
            "start": calc_start_sec,
            "end": calc_end_sec,
        },
        "save": save_result,
    }


# ======================================================
# ▼ inspect（ブロック一覧取得：UI表示用）
# ======================================================
@router.post("/inspect")
async def inspect_dat(
    file_path: str = Form(...),
    start_date: str = Form(...)
):
    """
    dat ファイルを解析し、
    ブロックごとの秒数・表示用情報を返す
    （TimeInfoBox 用）
    """
    blocks = F_BuildDatBlockInfo(file_path, start_date)

    return {
        "message": "OK",
        "total_blocks": len(blocks),
        "timeInfoList": [
            {
                "sec": b["seconds"],                           # 秒（calc_start/calc_end 用）
                "hms": b["sec_info"]["h_m_s"],                 # 表示用
                "datetime": b["datetime_info"]["datetime_str"] # 表示用
            }
            for b in blocks
        ],
    }