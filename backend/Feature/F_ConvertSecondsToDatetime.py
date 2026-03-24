"""
@component F_ConvertSecondsToDatetime
@folder backend/Feature
@category DateTime
@description
    start_date（YYYY-MM-DD）を基準とし、
    与えられた秒数（先頭行1列目）を絶対日時（datetime）に変換する。

@params
    start_date : str
        変換の基準となる日付（例: "2024-01-01"）
    seconds : int | float
        ブロック先頭行1列目に含まれる経過秒数

@return
    dict {
        "datetime_str": "YYYY-MM-DD HH:MM:SS",
        "date": "YYYY-MM-DD",
        "time": "HH:MM:SS",
    }

@remarks
    - seconds が負値の場合は基準日前になるが計算可能
    - start_date は日付のみで扱う（時は 00:00:00）
"""

from datetime import datetime, timedelta

def F_ConvertSecondsToDatetime(start_date: str, seconds):
    try:
        sec = int(seconds)
    except:
        return {
            "datetime_str": "",
            "date": "",
            "time": "",
        }

    # ▼ 基準日（00:00:00）
    base = datetime.strptime(start_date, "%Y-%m-%d")

    # ▼ 秒数を timedelta に変換
    delta = timedelta(seconds=sec)

    # ▼ 合成
    dt = base + delta

    return {
        "datetime_str": dt.strftime("%Y-%m-%d %H:%M:%S"),
        "date": dt.strftime("%Y-%m-%d"),
        "time": dt.strftime("%H:%M:%S"),
    }


# ▼ テスト実行
if __name__ == "__main__":
    print(F_ConvertSecondsToDatetime("2024-01-01", 93615))