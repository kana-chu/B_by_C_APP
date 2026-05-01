"""
@component f_cC_concatSameItem
@folder backend/Feature/calcCensus
@category DataProcessing
@description
    複数の経済センサスシートから必要な列のみを抽出し、
    NumPy / pandas により高速に縦結合する。

    economicMeshSize:
        - 500 → C D E F
        - 250 → C D E F G
"""

import os
import pandas as pd
from openpyxl.utils import column_index_from_string

from Feature.calcCensus.f_cC_normalizeHeader import f_cC_normalizeHeader


def f_cC_concatSameItem(
    file_path: str,
    sheet_list: list,
    item_list: list,
    economicMeshSize: int,
):
    print("f_cC_concatSameItem開始")

    if not os.path.isfile(file_path):
        raise FileNotFoundError(file_path)

    # --------------------------------------------------
    # 共通列定義
    # --------------------------------------------------
    base_cols = ["C", "D", "E", "F"]
    if economicMeshSize == 250:
        base_cols.append("G")

    base_idx = [column_index_from_string(c) - 1 for c in base_cols]

    # --------------------------------------------------
    # item 列定義
    # --------------------------------------------------
    item_defs = []
    for item in item_list:
        col_letter = item.get("columnIndex")
        if not col_letter:
            continue
        item_defs.append({
            "name": item["sheetName"],
            "idx": column_index_from_string(col_letter) - 1,
            "header": item["headerName"],
        })

    df_list = []

    # --------------------------------------------------
    # 各シート処理
    # --------------------------------------------------
    for sheet_name in sheet_list:
        df_raw = pd.read_excel(
            file_path,
            sheet_name=sheet_name,
            header=0,
            engine="openpyxl",
        )

        base_df = df_raw.iloc[:, base_idx]
        item_df = pd.DataFrame()

        for item in item_defs:
            actual = f_cC_normalizeHeader(df_raw.columns[item["idx"]])
            expected = f_cC_normalizeHeader(item["header"])

            if actual != expected:
                print(
                    f"⛔ 不一致: {sheet_name} / {item['name']} "
                    f"{actual} != {expected}"
                )
                continue

            item_df[item["name"]] = df_raw.iloc[:, item["idx"]]

        df_list.append(pd.concat([base_df, item_df], axis=1))

    if not df_list:
        return pd.DataFrame()

    result = pd.concat(df_list, ignore_index=True)
    print("✅ concat 完了")

    return result