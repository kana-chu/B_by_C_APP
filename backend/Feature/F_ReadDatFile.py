"""
@component F_ReadDatFile
@folder backend/Feature
@category DataProcessing
@description
    絶対パスで指定された dat ファイル（スペース区切り）を読み込み、
    先頭が **3 列** の行で新しいブロックとして分割する処理を行う。
    先頭行は各ブロックの一部として DataFrame に含める。
    また、各ブロックの先頭行の「最初の3列だけ」を head_rows として返す。

@params
    input_file : str
        読み込む dat ファイルの絶対パス

@return
    dict {
        "dfs": List[pandas.DataFrame],   # ブロックごとの DataFrame
        "head_rows": List[list],         # 各ブロック先頭行の3列の値
    }

@usage
    result = F_ReadDatFile("C:/path/to/file.dat")
    dfs = result["dfs"]
    heads = result["head_rows"]

@remarks
    - UTF-8 (BOMなし) 前提（Electron 側でチェック済み）。
    - ブロックの境界行は「3列行」として扱う。
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

            # ▼ ★ ブロック先頭行は列数 3 の行 ★
            if len(cols) == 3:
                if current_block:
                    blocks.append(current_block)
                    current_block = []

            current_block.append(cols)

    # ▼ 最後のブロック追加
    if current_block:
        blocks.append(current_block)

    # ▼ DataFrame 変換
    dfs = [
        pd.DataFrame(block).apply(pd.to_numeric, errors="coerce")
        for block in blocks
    ]

    # ▼ 先頭行（3列だけ）抽出：DataFrame ではなく raw データから取得
    head_rows = []
    for block in blocks:
        if block:
            raw_head = block[0]  # DataFrame にする前の元データ
            head_rows.append(raw_head[:3])  # ★ ここがあなたの要望どおり3列だけ
        else:
            head_rows.append([])

    return {
        "dfs": dfs,
        "head_rows": head_rows,
    }


# ======================================================
# ▼ テスト実行用
# ======================================================
if __name__ == "__main__":
    import os

    print("===== F_ReadDatFile テスト実行 =====")

    test_path = r"C:\作業データ\2026_03_牧野さん\rain_202107050000_202107112300.dat"  # 任意のテストファイル

    if not os.path.exists(test_path):
        print(f"[ERROR] テストファイルが見つかりません: {test_path}")
    else:
        result = F_ReadDatFile(test_path)
        dfs = result["dfs"]
        head_rows = result["head_rows"]

        print(f"\n★ ブロック数: {len(dfs)}\n")

        print("--- 各ブロックの先頭3列一覧 ---")
        for i, head in enumerate(head_rows):
            print(f"[Block {i}] {head}")

        if dfs:
            print("\n--- 最初のブロックの5行 ---")
            print(dfs[0].head())

    print("===== END =====")