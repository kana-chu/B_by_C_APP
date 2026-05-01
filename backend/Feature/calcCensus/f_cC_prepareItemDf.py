import pandas as pd

def f_cC_prepareItemDf(df: pd.DataFrame) -> pd.DataFrame:
    print("f_cC_prepareItemDf")
    """
    item df の前処理
    - 1列目が空の行を削除
    """
    df = df[df.iloc[:, 0].notna()].copy()
    return df