"""
@component f_cC_createOutputWorkbook
@folder backend/Feature/calcCensus
@category DataProcessing
@description
    元 Excel ファイルをコピーし、Census 計算用の出力 Excel を生成する。

@params
    src_path  : str   元データ Excel のパス
    dest_path : str   出力先 Excel のパス

@return
    None
"""

import os
import shutil


def f_cC_createOutputWorkbook(src_path: str, dest_path: str):
    if not os.path.isfile(src_path):
        raise FileNotFoundError(f"元データが存在しません: {src_path}")

    dest_dir = os.path.dirname(dest_path)
    if dest_dir and not os.path.isdir(dest_dir):
        os.makedirs(dest_dir, exist_ok=True)

    # 上書きOKでコピー
    shutil.copyfile(src_path, dest_path)