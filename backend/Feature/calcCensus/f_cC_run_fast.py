# backend/Feature/calcCensus/f_cC_run_fast.py

from Feature.calcCensus.run_fast.build_mesh_data import build_mesh_data
from Feature.calcCensus.run_fast.apply_percentage import apply_percentage
from Feature.calcCensus.run_fast.apply_zero_fill_flags import apply_zero_fill_flags
from Feature.calcCensus.run_fast.export_excel_once import export_excel_once


def f_cC_run_fast(df, df_mesh, rate_vals, item_list, req):
    print("f_cC_run_fast")
    """
    高速ルート：完成データを作ってから Excel 保存1回
    """
    print(df)

    data = build_mesh_data(df, df_mesh, item_list, req)
    data = apply_percentage(data, rate_vals)
    data = apply_zero_fill_flags(data)
    export_excel_once(req.save_path, data)
