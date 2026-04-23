# backend/Feature/calcCensus/run_fast/apply_zero_fill_flags.py

import numpy as np


def apply_zero_fill_flags(
    data: dict[str, np.ndarray]
) -> dict[str, np.ndarray]:
    """
    NaN を 0 に変換
    """

    result = {}

    for sheet, arr in data.items():
        out = arr.copy()
        out[np.isnan(out)] = 0.0
        result[sheet] = out

    return result
