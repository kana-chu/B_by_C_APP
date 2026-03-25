"""
@component Mod_Api_Dat_ChangeScale_Backend
@folder backend/Router
@category API
@description
    Electron → React → FastAPI のフローで送られた dat ファイルを読み込み、
    範囲抽出（calc_start, calc_end）→ 等倍計算（multiplier）→ dat 保存を行う。
"""

from fastapi import APIRouter, Form
from Feature.F_BuildDatBlockInfo import F_BuildDatBlockInfo
from Feature.F_FilterBlockByRange import F_FilterBlockByRange
from Feature.F_ChangeScale import F_ChangeScale
from Feature.F_SaveChangedDatFile import F_SaveChangedDatFile

router = APIRouter(prefix="/dat", tags=["dat"])


# ======================================================
# ▼ change-scale
# ======================================================
@router.post("/change-scale")
async def change_scale(
    file_path: str = Form(...),
    save_path: str = Form(...),
    start_date: str = Form(...),
    end_date: str = Form(...),
    calc_start: str = Form(...),   # フロントから来るのは seconds
    calc_end: str = Form(...),
    multiplier: str = Form(...)
):
    """
    Dat 等倍計算 API
    1. dat → ブロック構造化
    2. calc_start / calc_end（秒）で範囲抽出
    3. multiplier 倍 → 小数1桁切り上げ
    4. NaN → 空欄、TAB 区切りで save_path へ保存
    """

    # --------------------------------------------
    # 1. dat をブロック化（seconds と datetime_info が決まる）
    # --------------------------------------------
    try:
        blocks = F_BuildDatBlockInfo(file_path, start_date)
    except Exception as e:
        return {
            "message": "dat ファイルを読み込めませんでした",
            "error": str(e),
        }

    total_blocks = len(blocks)

    # --------------------------------------------
    # 2. 秒による範囲抽出
    # --------------------------------------------
    try:
        calc_start_sec = int(calc_start)
        calc_end_sec = int(calc_end)
    except:
        return {
            "message": "calc_start / calc_end が数値に変換できません",
            "calc_start": calc_start,
            "calc_end": calc_end,
        }

    target_blocks = F_FilterBlockByRange(blocks, calc_start_sec, calc_end_sec)

    # --------------------------------------------
    # 3. スケール変換（小数1桁切り上げ・整数化）
    # --------------------------------------------
    scaled = F_ChangeScale(target_blocks, multiplier)
    scaled_blocks = scaled["result_blocks"]

    # --------------------------------------------
    # 4. 元ブロックの該当部分だけ差し替え → 保存
    # --------------------------------------------
    save_result = F_SaveChangedDatFile(
        original_blocks=blocks,
        scaled_blocks=scaled_blocks,
        save_path=save_path
    )

    # --------------------------------------------
    # 5. フロントへ返す
    # --------------------------------------------
    return {
        "message": "OK",
        "total_blocks": total_blocks,
        "target_blocks": len(target_blocks),
        "multiplier": scaled["multiplier"],      # フロントでログ表示に使う
        "seconds_range": {
            "start": calc_start_sec,
            "end": calc_end_sec,
        },
        "save": save_result,
    }


# ======================================================
# ▼ inspect（秒・日時一覧）
# ======================================================
@router.post("/inspect")
async def inspect_dat(
    file_path: str = Form(...),
    start_date: str = Form(...)
):
    """
    ブロック一覧を返すだけの軽量 API
    React の TimeInfoBox に利用
    """
    blocks = F_BuildDatBlockInfo(file_path, start_date)

    return {
        "message": "OK",
        "timeInfoList": [
            {
                "sec": b["seconds"],                          # 範囲抽出用
                "hms": b["sec_info"]["h_m_s"],                # 表示用
                "datetime": b["datetime_info"]["datetime_str"] # 表示用
            }
            for b in blocks
        ],
        "total_blocks": len(blocks),
    }