"""
@component f_cC_multiplyPercentage_fast
@folder backend/Feature/calcCensus
@category DataProcessing
@description
    割合シートを基に、複数 item シートへ割合掛けを行い、
    ExcelWriter を 1 回だけ使用して一括で書き戻す（最速）

    前提仕様：
      - 各シートは 4行4列をヘッダ領域として持つ
      - 割合は [4:, 4:] のデータ領域にのみ適用する
      - 行数・列数が完全一致しない場合でもエラーにしない
      - 数値に変換できないセル（*, 空白 等）はそのまま保持する
"""

import pandas as pd
import numpy as np


def f_cC_multiplyPercentage(
    file_path: str,
    percentage_sheetName: str,
    item_sheetNames: list[str],
):
    print("📈 割合掛け（高速版）開始")

    # ==================================================
    # 1. 割合シート読み込み（1回）
    # ==================================================
    df_rate = pd.read_excel(
        file_path,
        sheet_name=percentage_sheetName,
        header=None,
        engine="openpyxl",
    )

    rate_vals = df_rate.iloc[4:, 4:].to_numpy(dtype=float)
    rate_h, rate_w = rate_vals.shape

    # ==================================================
    # 2. item シート読み込み
    # ==================================================
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

    # ==================================================
    # 3. 割合計算（数値セルのみ）
    # ==================================================
    for name, df_item in item_dfs.items():
        print(f"  ├─ 計算中: {name}")

        # object 配列として保持（文字を壊さない）
        arr = df_item.to_numpy(dtype=object, copy=True)

        data = arr[4:, 4:]
        data_h, data_w = data.shape

        h = min(data_h, rate_h)
        w = min(data_w, rate_w)

        for i in range(h):
            for j in range(w):
                try:
                    val = float(data[i, j])
                except (TypeError, ValueError):
                    # "*" 等はそのまま
                    continue

                data[i, j] = val * rate_vals[i, j]

        arr[4:, 4:] = data
        item_dfs[name] = pd.DataFrame(arr)

    # ==================================================
    # 4. Excel へ一括書き戻し
    # ==================================================
    print("excelに書き込み中")
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

        print("保存中")

    print("✅ 割合掛け（高速版）完了")