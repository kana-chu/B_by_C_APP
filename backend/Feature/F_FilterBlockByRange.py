"""
@component F_FilterBlockByRange
@folder backend/Feature
@category DataProcessing
"""

import pandas as pd

def F_FilterBlockByRange(blocks, calc_start_sec: int, calc_end_sec: int):
    filtered = []
    for b in blocks:
        sec = b.get("seconds")
        if sec is None:
            continue
        if calc_start_sec <= sec <= calc_end_sec:
            filtered.append(b)
    return filtered


# ======================================================
# ▼ テスト実行
# ======================================================
if __name__ == "__main__":
    # ★ 相対 import（Feature パッケージ内の正しい方法）
    from .F_BuildDatBlockInfo import F_BuildDatBlockInfo

    import os

    print("===== F_FilterBlockByRange テスト =====")

    test_path = r"C:\作業データ\2026_03_牧野さん\rain_202107050000_202107112300.dat"
    start_date = "2021-07-05"

    if not os.path.exists(test_path):
        print(f"[ERROR] ファイルがありません: {test_path}")
        exit()

    blocks = F_BuildDatBlockInfo(test_path, start_date)
    print(f"★ 全ブロック数: {len(blocks)}")

    # テスト範囲
    calc_start_sec = 3600
    calc_end_sec = 3600 * 24

    filtered = F_FilterBlockByRange(blocks, calc_start_sec, calc_end_sec)

    print(f"\n★ 抽出ブロック数: {len(filtered)}")
    for b in filtered[:10]:
        print(
            f"[Block {b['index']}] sec={b['seconds']}  dt={b['datetime_info']['datetime_str']}"
        )

    print("===== END =====")