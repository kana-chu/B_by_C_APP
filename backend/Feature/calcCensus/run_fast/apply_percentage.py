# backend/Feature/calcCensus/run_fast/apply_percentage.py

import numpy as np


def apply_percentage(
    data: dict[str, np.ndarray],
    rate_vals: np.ndarray,
) -> dict[str, np.ndarray]:
    """
    完成データに割合を掛ける（メモリ上）
    """

    result = {}

    for sheet, arr in data.items():
        with np.errstate(invalid="ignore"):
            result[sheet] = arr * rate_vals

    return result
