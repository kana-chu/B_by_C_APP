# backend/Feature/calcCensus/f_cC_run_fast_csv.py

"""
@component f_cC_run_fast_csv
@folder backend/Feature/calcCensus
@category DataProcessing
@description
    CSV 高速モード用の計算ルート
    - メッシュ反映
    - 割合適用
    - 0埋め
    ※ Excel / openpyxl / ファイル保存は一切行わない
"""

from Feature.calcCensus.run_fast.build_mesh_data import build_mesh_data
from Feature.calcCensus.run_fast.apply_percentage import apply_percentage
from Feature.calcCensus.run_fast.apply_zero_fill_flags import apply_zero_fill_flags


def f_cC_run_fast_csv(df, df_mesh, rate_vals, item_list, req):
    print("f_cC_run_fast_csv")
    """
    CSV 高速ルート（計算のみ）

    Parameters
    ----------
    df : pandas.DataFrame
        結合済みデータ
    df_mesh : pandas.DataFrame
        メッシュ定義
    rate_vals : np.ndarray
        割合配列
    item_list : list[dict]
        項目定義
    req : CalcCensusRequest
        リクエスト情報

    Returns
    -------
    dict[str, np.ndarray]
        { 項目名: 完成データ配列 }
    """

    # 1. メッシュへ値を配置
    print(df)
    data = build_mesh_data(df, df_mesh, item_list, req)

    # 2. 割合適用（サイズ差は内部で安全処理済み）
    data = apply_percentage(data, rate_vals)

    # 3. NaN → 0 などの後処理
    data = apply_zero_fill_flags(data)

    return data
