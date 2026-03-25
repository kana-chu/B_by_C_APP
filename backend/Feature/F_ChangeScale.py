"""
@component F_ChangeScale
@folder backend/Feature
@category DataProcessing
@description
    F_FilterBlockByRange で抽出されたブロック群について、
    df（ヘッダー行を除くデータ行）に multiplier を掛け算する処理。

@params
    blocks : List[dict]
        F_BuildDatBlockInfo の返すブロック構造のサブセット
        各ブロックは "df" を持つことが前提。
    multiplier : 任意（str, int, float）
        フロントから送られた数値 → float に変換して使用。
        計算前にフロントログ用に返す。

@return
    dict {
        "multiplier": float,                    # フロントがログに使えるように
        "result_blocks": List[dict],            # 計算後のブロック（df入り）
    }

@remarks
    - df は head 行（index=0）を除いた行に multiplier を掛ける
    - 計算結果は小数第一位で「切り上げ」
    - pandas の numeric_only=True で数値列だけ処理
"""

import pandas as pd
import math
from .F_FormatValue import F_FormatValue

def F_ChangeScale(blocks, multiplier):

    try:
        mul = float(multiplier)
    except:
        raise ValueError(f"multiplier を数値に変換できません: {multiplier}")

    result_blocks = []

    for b in blocks:
        df = b["df"].copy()

        # df の 2 行目以降（データ部分）のみ変換
        if len(df) > 1:
            data_part = df.iloc[1:].astype(float)
            scaled = data_part * mul

            # 四捨五入ではなく小数1桁切り上げ → 整数表記処理
            formatted = scaled.applymap(lambda x: F_FormatValue(x))

            # df の先頭行はそのまま
            new_df = pd.concat([df.iloc[[0]], formatted], ignore_index=True)

        else:
            new_df = df.copy()

        result_blocks.append({
            "index": b["index"],
            "seconds": b["seconds"],
            "datetime_info": b["datetime_info"],
            "df": new_df,
        })

    return {
        "multiplier": mul,
        "result_blocks": result_blocks,
    }



# ======================================================
# ▼ テスト実行
# ======================================================
if __name__ == "__main__":
    from .F_BuildDatBlockInfo import F_BuildDatBlockInfo
    from .F_FilterBlockByRange import F_FilterBlockByRange
    import os

    print("===== F_ChangeScale テスト =====")

    test_file = r"C:\作業データ\2026_03_牧野さん\rain_202107050000_202107112300.dat"
    start_date = "2021-07-05"

    if not os.path.exists(test_file):
        print(f"[ERROR] ファイルがありません: {test_file}")
        exit()

    blocks = F_BuildDatBlockInfo(test_file, start_date)

    # 範囲抽出（例）
    calc_start_sec = 3600
    calc_end_sec = 3600 * 5
    filtered = F_FilterBlockByRange(blocks, calc_start_sec, calc_end_sec)

    # スケール適用
    result = F_ChangeScale(filtered, multiplier="1.8")

    print("★ multiplier =", result["multiplier"])
    print("★ processed blocks =", len(result["result_blocks"]))

    for b in result["result_blocks"][:3]:
        print("\n--- Block", b["index"], "---")
        print(b["df"].head())

    print("===== END =====")