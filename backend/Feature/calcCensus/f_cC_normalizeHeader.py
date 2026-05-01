"""
@component f_cC_normalizeHeader
@folder backend/Feature/calcCensus
@category Util
@description
    Excel ヘッダー文字列を正規化する。
    - 全角/半角を同一視（NFKC）
    - 前後空白を除去
"""

import unicodedata


def f_cC_normalizeHeader(text) -> str:
    if text is None:
        return ""
    return unicodedata.normalize("NFKC", str(text)).strip()