"""
@component F_BuildDatBlockInfo
@folder backend/Feature
@category DataProcessing
@description
    F_ReadDatFile と F_ConvertSeconds を統合し、
    ブロック情報（先頭3列・秒数・時間表示・DataFrame）を
    検索しやすい辞書リスト形式にまとめて返す。

@params
    input_file : str
        dat ファイルの絶対パス

@return
    List[dict]
        [
            {
                "index": int,           # ブロック番号
                "raw_head": list,       # 先頭3列（例: [sec, col2, col3]）
                "seconds": int,         # 1列目の秒数
                "sec_info": {           # 秒数の時間変換
                    "d_h_m_s": str,
                    "h_m_s": str
                },
                "df": pandas.DataFrame, # ブロック中のデータ
            },
            ...
        ]

@usage
    blocks = F_BuildDatBlockInfo("C:/path/to/file.dat")
    blocks[0]["sec_info"]["d_h_m_s"]
    blocks[0]["sec_info"]["h_m_s"]

@remarks
    - raw_head[0] は秒数前提
    - head_rows の仕様（3列）と一致
"""

from Feature.F_ReadDatFile import F_ReadDatFile
from Feature.F_ConvertSeconds import F_ConvertSeconds

def F_BuildDatBlockInfo(input_file: str):

    result = F_ReadDatFile(input_file)

    dfs = result["dfs"]
    head_rows = result["head_rows"]   # [[sec, a, b], ...]

    block_info_list = []

    for idx, (df, head) in enumerate(zip(dfs, head_rows)):

        if head:
            seconds = int(head[0])   # 先頭3列の1列目が秒数
        else:
            seconds = None

        # 秒数 → d/h/m/s & h/m/s 変換
        sec_info = (
            F_ConvertSeconds(seconds)
            if seconds is not None else
            {"d_h_m_s": "", "h_m_s": ""}
        )

        block_info_list.append({
            "index": idx,
            "raw_head": head,     # 3列
            "seconds": seconds,
            "sec_info": sec_info, # ★ これに d/h/m/s と h/m/s が両方入る
            "df": df,
        })

    return block_info_list


# ======================================================
# ▼ テスト実行
# ======================================================
if __name__ == "__main__":
    import os

    test_path = r"C:\作業データ\2026_03_牧野さん\rain_202107050000_202107112300.dat"   #テスト時はここを書き換える!!!!!

    print("===== F_BuildDatBlockInfo テスト =====")

    if not os.path.exists(test_path):
        print(f"[ERROR] テストファイルが見つかりません: {test_path}")
    else:
        blocks = F_BuildDatBlockInfo(test_path)
        print(f"\n★ ブロック数: {len(blocks)}\n")

        for b in blocks:
            print(
                f"[Block {b['index']}] 秒={b['seconds']}  "
                f"d/h/m/s={b['sec_info']['d_h_m_s']}  "
                f"h/m/s={b['sec_info']['h_m_s']}"
            )

    print("===== END =====")