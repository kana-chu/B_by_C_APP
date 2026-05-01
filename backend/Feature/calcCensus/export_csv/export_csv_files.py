"""
@component export_csv_files
@folder backend/Feature/calcCensus/export_csv
@category DataProcessing
@description
    run_fast で生成した各項目データを
    「項目名.csv」として指定フォルダに出力する
"""

import os
import pandas as pd
import numpy as np
from typing import Dict


def export_csv_files(
    output_dir: str,
    data: Dict[str, np.ndarray],
    encoding: str = "utf-8-sig",
):
    """
    Parameters
    ----------
    output_dir : str
        CSV 出力先フォルダ
    data : dict[str, np.ndarray]
        { 項目名 : データ配列 }
    encoding : str
        CSV文字コード（Excel直開き対策）
    """

    # フォルダが存在しなければ作成（既にあれば何もしない）
    os.makedirs(output_dir, exist_ok=True)

    for item_name, arr in data.items():
        csv_path = os.path.join(output_dir, f"{item_name}.csv")

        df = pd.DataFrame(arr)

        df.to_csv(
            csv_path,
            index=False,
            header=False,
            encoding=encoding,
        )