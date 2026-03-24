"""
@component F_ReadDatFile
@folder backend/Feature
@category DataProcessing
@description
    絶対パスで指定された dat ファイル（スペース区切り）を読み込み、
    先頭が 4 列の行で新しいブロックとして分割する処理を行う。

@params
    input_file : str
        読み込む dat ファイルの絶対パス

@return
    List[pandas.DataFrame]
        ブロックごとに DataFrame を返す
"""

import pandas as pd

def F_ReadDatFile(input_file: str):
    blocks = []
    current_block = []

    with open(input_file, "r", encoding="utf-8") as f:
        for line in f:
            if not line.strip():
                continue

            cols = line.split()

            # ★ 先頭行（4列のみ）で新しいブロック開始
            if len(cols) == 4:
                if current_block:
                    blocks.append(current_block)
                    current_block = []

            current_block.append(cols)

    if current_block:
        blocks.append(current_block)

    # DataFrame 変換
    dfs = [pd.DataFrame(block).apply(pd.to_numeric, errors="coerce")
            for block in blocks]

    return dfs