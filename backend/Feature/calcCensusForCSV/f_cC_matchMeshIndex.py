import pandas as pd
import numpy as np

def f_cC_matchMeshIndex(df_mesh: pd.DataFrame, x_cells, y_cells, d2, base):
    """
    メッシュ DataFrame 上で該当セル index を返す
    """
    x_mask = (
        (df_mesh.iloc[0, :].str[0] == d2[1]) &
        (df_mesh.iloc[1, :].str[0] == base[1]) &
        (df_mesh.iloc[2, :].isin(x_cells.astype(str)))
    )

    y_mask = (
        (df_mesh.iloc[:, 0].str[0] == d2[0]) &
        (df_mesh.iloc[:, 1].str[0] == base[0]) &
        (df_mesh.iloc[:, 2].isin(y_cells.astype(str)))
    )

    return np.where(y_mask)[0], np.where(x_mask)[0]