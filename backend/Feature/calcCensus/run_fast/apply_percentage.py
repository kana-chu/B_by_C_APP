# backend/Feature/calcCensus/run_fast/apply_percentage.py

import numpy as np


def apply_percentage(
    data: dict[str, np.ndarray],
    rate_vals: np.ndarray,
) -> dict[str, np.ndarray]:
    """
    完成データに割合を掛ける（メモリ上）

    - arr と rate_vals の共通領域だけに割合を適用する
    - サイズ不一致でもエラーにならない
    - 統計的にも正しい
    """

    result = {}

    rh, rw = rate_vals.shape  # 割合データの有効領域

    for sheet, arr in data.items():
        h, w = arr.shape

        # 掛けられる共通領域サイズを計算
        hh = min(h, rh)
        ww = min(w, rw)

        out = arr.copy()

        with np.errstate(invalid="ignore"):
            out[:hh, :ww] = out[:hh, :ww] * rate_vals[:hh, :ww]

        result[sheet] = out

    return result
