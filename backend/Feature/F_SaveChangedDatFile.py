"""
@component F_SaveChangedDatFile
@folder backend/Feature
@category DataProcessing
@description
    元のブロックリスト（block_info_list）に対して、
    F_ChangeScale で変更されたブロック df を上書きし、
    save_path に .dat として保存する。
    TAB区切りで .dat を保存（Excelが列分けできる）

@params
    original_blocks : List[dict]
        F_BuildDatBlockInfo が返す全ブロック
    scaled_blocks : List[dict]
        F_ChangeScale が返す result_blocks
    save_path : str
        出力先の .dat 絶対パス

@return
    dict: 保存結果
"""

import os
from .F_FormatValue import F_FormatValue

def F_SaveChangedDatFile(original_blocks, scaled_blocks, save_path):

    scaled_map = {b["index"]: b["df"] for b in scaled_blocks}
    os.makedirs(os.path.dirname(save_path), exist_ok=True)

    with open(save_path, "w", encoding="utf-8") as f:

        for b in original_blocks:
            df = scaled_map.get(b["index"], b["df"])

            for row in df.itertuples(index=False, name=None):
                formatted = [F_FormatValue(x) for x in row]

                # ★★★ タブ区切りに変更（Excelが自動で列分け）
                line = "\t".join(formatted)

                f.write(line + "\n")

    return {
        "message": "保存完了（TAB区切り）",
        "save_path": save_path,
        "changed_blocks": list(scaled_map.keys())
    }


# ======================================================
# ▼ テスト実行
# ======================================================
if __name__ == "__main__":
    from .F_BuildDatBlockInfo import F_BuildDatBlockInfo
    from .F_FilterBlockByRange import F_FilterBlockByRange
    from .F_ChangeScale import F_ChangeScale

    test_path = r"C:\作業データ\2026_03_牧野さん\rain_202107050000_202107112300.dat"      #テスト時手動変更!!!!!!!!!!
    start_date = "2021-07-05"    #テスト時手動変更!!!!!!!!!!
    save_path = r"C:\作業データ\2026_03_牧野さん\multiply_rain_202107050000_202107112300.dat"  #テスト時手動変更!!!!!!!!!!

    # 読み込み
    blocks = F_BuildDatBlockInfo(test_path, start_date)

    # 適当に範囲フィルタ
    filtered = F_FilterBlockByRange(blocks, 1800, 3600) #テスト時手動変更!!!!!!!!!!

    # 倍率変更
    scaled = F_ChangeScale(filtered, 2.0)  #テスト時手動変更!!!!!!!!!!

    # 保存
    result = F_SaveChangedDatFile(blocks, scaled["result_blocks"], save_path)

    print(result)