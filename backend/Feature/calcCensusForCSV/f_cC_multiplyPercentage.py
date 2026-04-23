"""
@component f_cC_multiplyPercentage_fast
@folder backend/Feature/calcCensus
@category DataProcessing
@description
    割合シートを基に、複数 item シートへ割合掛けを行い、
    ExcelWriter を 1 回だけ使用して一括で書き戻す（最速）
"""

import pandas as pd
import numpy as np


def f_cC_multiplyPercentage(
    file_path: str,
    percentage_sheetName: str,
    item_sheetNames: list[str],
):
    print("📈 割合掛け（高速版）開始")

    # --- 割合シート読み込み（1回だけ） ---
    df_rate = pd.read_excel(
        file_path,
        sheet_name=percentage_sheetName,
        header=None,
        engine="openpyxl",
    )

    rate_vals = df_rate.iloc[4:, 4:].to_numpy(dtype=float)

    # --- itemシートを全部読む ---
    print("各項目のシート読み込み中...")
    item_dfs = {
        name: pd.read_excel(
            file_path,
            sheet_name=name,
            header=None,
            engine="openpyxl",
        )
        for name in item_sheetNames
    }

    # --- 計算 ---
    for name, df_item in item_dfs.items():
        print(f"  {df_item}計算中: {name}")
        arr = df_item.to_numpy(dtype=float, copy=True)

        with np.errstate(invalid="ignore"):
            arr[4:, 4:] = arr[4:, 4:] * rate_vals

        item_dfs[name] = pd.DataFrame(arr)

    # --- ★ExcelWriter 1回だけ ---
    print(f"excelに書き込み中")
    with pd.ExcelWriter(
        file_path,
        engine="openpyxl",
        mode="a",
        if_sheet_exists="replace",
    ) as writer:

        total = len(item_dfs)
        for i, (name, df_out) in enumerate(item_dfs.items(), start=1):
            print(f"  ├─ [{i}/{total}] 割合反映中: {name}")
            df_out.to_excel(
                writer,
                sheet_name=name,
                index=False,
                header=False,
            )

        print(f"保存中")

    print("✅ 割合掛け（高速版）完了")