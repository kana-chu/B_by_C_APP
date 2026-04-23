"""
@component f_cC_writeItemsToExcel
@folder backend/Feature/calcCensus
@category DataProcessing
@description
    すべての item シートを DataFrame + NumPy で更新し、
    ExcelWriter を 1 回だけ使って一括で書き戻す（最速）
"""

import pandas as pd
import numpy as np

def f_cC_writeItemToExcel(
    file_path: str,
    item_write_tasks: dict,
):
    """
    @params
        file_path : 出力 Excel
        item_write_tasks : {
            item_name: [
                (row_indices, col_indices, value),
                ...
            ],
            ...
        }
    """

    # --- すべての item シートを読み込む ---
    item_dfs = {
        item_name: pd.read_excel(
            file_path,
            sheet_name=item_name,
            header=None,
            engine="openpyxl",
        )
        for item_name in item_write_tasks.keys()
    }

    # --- NumPy でまとめて反映 ---
    for item_name, tasks in item_write_tasks.items():
        arr = item_dfs[item_name].to_numpy()

        for row_idx, col_idx, value in tasks:
            if value is None:
                continue
            arr[np.ix_(row_idx, col_idx)] = value

        item_dfs[item_name] = pd.DataFrame(arr)

    # --- ExcelWriter を 1 回だけ開く（★最重要） ---
    with pd.ExcelWriter(
        file_path,
        engine="openpyxl",
        mode="a",
        if_sheet_exists="replace",
    ) as writer:

        total = len(item_dfs)
        for i, (item_name, df_out) in enumerate(item_dfs.items(), start=1):
            print(f"  ├─ [{i}/{total}] シート書き込み中: {item_name}")
            df_out.to_excel(
                writer,
                sheet_name=item_name,
                index=False,
                header=False,
            )
        print(f"保存中")