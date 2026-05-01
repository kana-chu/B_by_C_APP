# backend/Feature/calcCensus/run_fast/build_mesh_data.py

"""
@component build_mesh_data
@folder backend/Feature/calcCensus/run_fast
@category DataProcessing
@description
    前4列（並び順固定）＋項目列（item_list 依存）の DataFrame から、
    各項目ごとの 2 次元メッシュ配列を生成する。

    前提：
      - df.columns[0:4] は意味的に固定（列名は毎回変わってよい）
        0: 上位メッシュ（未使用 or 将来用）
        1: 2次地域メッシュコード（d2）
        2: 基準メッシュコード（base）
        3: 下位メッシュコード（1/2 等）
      - 4 列目以降は item_list の sheetName と一致
"""

import numpy as np

from Feature.calcCensus.f_cC_calcMeshCellNo import f_cC_calcMeshCellNo
from Feature.calcCensus.f_cC_matchMeshIndex import f_cC_matchMeshIndex


def build_mesh_data(df, df_mesh, item_list, req) -> dict[str, np.ndarray]:
    """
    Parameters
    ----------
    df : pandas.DataFrame
        f_cC_concatSameItem + f_cC_prepareItemDf 済み DataFrame
    df_mesh : pandas.DataFrame
        出力メッシュ定義（shape が最終配列サイズ）
    item_list : list[dict]
        項目定義（item["sheetName"] を使用）
    req : CalcCensusRequest
        census_meshSize / ex_meshSize を含む

    Returns
    -------
    dict[str, np.ndarray]
        { sheetName: 2次元メッシュ配列 }
    """

    # --------------------------------------------------
    # デバッグ：列構造確認
    # --------------------------------------------------
    print("✅ build_mesh_data df.columns =", list(df.columns))

    # --------------------------------------------------
    # 出力配列初期化（項目ごと）
    # --------------------------------------------------
    result = {
        item["sheetName"]: np.zeros(df_mesh.shape, dtype=float)
        for item in item_list
    }

    # --------------------------------------------------
    # 項目列 index マップ（5列目以降）
    # --------------------------------------------------
    col_index_map = {col: i for i, col in enumerate(df.columns)}

    # --------------------------------------------------
    # 行ループ
    # --------------------------------------------------
    for row in df.itertuples(index=False):
        try:
            # --- 前4列（並び順固定） ---
            # row[0]: 上位メッシュ（未使用）
            d2   = str(int(row[1])).zfill(2)
            base = str(int(row[2])).zfill(2)
            half = row[3]  # 下位メッシュコード

        except (IndexError, ValueError, TypeError) as e:
            raise RuntimeError(
                "前4列の構造が想定と一致しません"
            ) from e

        # --------------------------------------------------
        # メッシュセル番号計算
        # ※ f_cC_calcMeshCellNo は 4 引数必須
        # --------------------------------------------------
        x_cells, y_cells = f_cC_calcMeshCellNo(
            half,
            None,                   # lat を使わない場合でも必須
            req.census_meshSize,
            req.ex_meshSize,
        )

        # --------------------------------------------------
        # メッシュインデックス解決
        # --------------------------------------------------
        y_idx, x_idx = f_cC_matchMeshIndex(
            df_mesh=df_mesh,
            x_cells=x_cells,
            y_cells=y_cells,
            d2=d2,
            base=base,
        )

        # --------------------------------------------------
        # 各項目の値を反映
        # --------------------------------------------------
        for item in item_list:
            sheet = item["sheetName"]
            idx = col_index_map.get(sheet)
            if idx is None:
                continue

            value = row[idx]
            if value is None:
                continue

            result[sheet][np.ix_(y_idx, x_idx)] = value

    # --------------------------------------------------
    # デバッグ：結果確認（必要ならコメントアウト）
    # --------------------------------------------------
    print("✅ build_mesh_data result keys =", list(result.keys()))
    print(result)

    return result