"""
@component f_cC_readMeshDf
@folder backend/Feature/calcCensus
@category DataProcessing
@description
    Excel ファイルの「メッシュ」シートを読み込み、
    マッチング用に正規化した DataFrame を返す。
"""

import pandas as pd


def f_cC_readMeshDf(file_path: str) -> pd.DataFrame:
    print("f_cC_readMeshDf")
    # メッシュシートを DataFrame 化
    df = pd.read_excel(
        file_path,
        sheet_name="メッシュ",
        header=None,
        engine="openpyxl",
    )

    # 1〜4列を下方向に補完
    df.iloc[:, :4] = df.iloc[:, :4].ffill()

    # 1〜4行を右方向に補完
    df.iloc[:4, :] = df.iloc[:4, :].ffill(axis=1)

    # 数値→文字列正規化（.0 除去）
    df = df.astype(str).apply(
        lambda col: col.str.replace(r"\.0$", "", regex=True)
    )

    return df
