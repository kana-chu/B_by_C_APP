# backend/Feature/calcCensus/run_fast/export_excel_once.py

import pandas as pd
from openpyxl import load_workbook


def export_excel_once(
    file_path: str,
    data: dict[str, any],
):
    """
    完成データを Excel に一括書き込み
    """
    with pd.ExcelWriter(
        file_path,
        engine="openpyxl",
        mode="a",
        if_sheet_exists="replace",
    ) as writer:
        for sheet, arr in data.items():
            pd.DataFrame(arr).to_excel(
                writer,
                sheet_name=sheet,
                index=False,
                header=False,
            )
