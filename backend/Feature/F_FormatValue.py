"""
@component F_FormatValue
@folder backend/Feature
@category Util
@description
    数値フォーマット関数（共通化）
    ・NaN → ""
    ・小数第1位で切り上げ
    ・小数第1位が 0 のとき整数化
"""

import pandas as pd
import math

def F_FormatValue(x):
    # NaN → 空欄
    if x is None or pd.isna(x):
        return ""

    # 数値化
    try:
        xf = float(x)
    except:
        return str(x)

    # 小数1桁で切り上げ
    rounded = math.ceil(xf * 10) / 10

    # 整数表記 (例: 2.0 → "2")
    if rounded.is_integer():
        return str(int(rounded))

    # 小数1桁の文字列
    return f"{rounded:.1f}"


# ========== テスト ==============
if __name__ == "__main__":
    tests = [1, 1.0, 1.01, 1.04, 1.05, None, float('nan')]
    for t in tests:
        print(t, "→", F_FormatValue(t))