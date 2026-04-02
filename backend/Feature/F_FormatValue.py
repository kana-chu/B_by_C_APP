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
from decimal import Decimal, ROUND_HALF_UP


def F_FormatValue(x):
    """
    ・None / NaN → 空文字
    ・小数第3位で四捨五入
    ・小数第2位表記
    """

    # NaN / None → 空欄
    if x is None or pd.isna(x):
        return ""

    # 数値化
    try:
        d = Decimal(str(x))
    except Exception:
        return str(x)

    # 小数第3位で四捨五入 → 小数第2位
    rounded = d.quantize(
        Decimal("0.00"),
        rounding=ROUND_HALF_UP
    )

    # 小数第2位固定表記
    return f"{rounded:.2f}"

# ========== テスト ==============
if __name__ == "__main__":
    tests = [1, 1.0, 1.01, 1.04, 1.05, None, float('nan')]
    for t in tests:
        print(t, "→", F_FormatValue(t))