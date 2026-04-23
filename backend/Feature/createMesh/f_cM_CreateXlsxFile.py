import os
from openpyxl import Workbook


def f_cM_CreateXlsxFile(save_directory):
    # 新しいワークブックを作成
    wb = Workbook()

    # デフォルトのシートを取得
    ws = wb.active
    ws.title = "Sheet1"

    try:
        wb.save(save_directory)
        print(f"{save_directory} ファイルを作成しました。")
        return save_directory
    except Exception as e:
        print(f"保存に失敗しました: {e}")
        return None
