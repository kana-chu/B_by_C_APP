# backend/Feature/calcCensus/run_fast/build_mesh_data.py

import numpy as np

from Feature.calcCensus.f_cC_calcMeshCellNo import f_cC_calcMeshCellNo
from Feature.calcCensus.f_cC_matchMeshIndex import f_cC_matchMeshIndex


def build_mesh_data(df, df_mesh, item_list, req) -> dict[str, np.ndarray]:
    """
    各 item シートの完成データ（割合未適用）を作成
    """

    result = {
        item["sheetName"]: np.zeros(df_mesh.shape, dtype=float)
        for item in item_list
    }

    col_index_map = {col: i for i, col in enumerate(df.columns)}

    for row in df.itertuples(index=False):
        x_cells, y_cells = f_cC_calcMeshCellNo(
            row[3],
            row[4],
            req.census_meshSize,
            req.ex_meshSize,
        )

        y_idx, x_idx = f_cC_matchMeshIndex(
            df_mesh=df_mesh,
            x_cells=x_cells,
            y_cells=y_cells,
            d2=str(int(row[1])).zfill(2),
            base=str(int(row[2])).zfill(2),
        )

        for item in item_list:
            sheet = item["sheetName"]
            value = row[col_index_map[sheet]]
            result[sheet][np.ix_(y_idx, x_idx)] = value

    return result