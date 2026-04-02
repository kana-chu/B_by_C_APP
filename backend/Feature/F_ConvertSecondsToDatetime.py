"""
@component F_ConvertSecondsToDatetime
@folder backend/Feature
@category DateTime
@description
    start_date を基準に秒数を絶対日時へ変換し、


@params
    start_date : str
        基準日（YYYY-MM-DD）
    end_date : str
        期待される終了日（YYYY-MM-DD）
    seconds : int | float
        経過秒数

@return
    dict {
        "datetime_str": "YYYY-MM-DD HH:MM:SS",
        "date": "YYYY-MM-DD",
        "time": "HH:MM:SS",
        "is_valid": bool,
        "error": str | None,
    }
"""

from datetime import datetime, timedelta

def F_ConvertSecondsToDatetime(start_date: str, seconds):
    try:
        sec = int(seconds)
    except Exception:
        return {
            "datetime_str": "",
            "date": "",
            "time": "",
        }

    # 基準日（00:00:00）
    base = datetime.strptime(start_date, "%Y-%m-%d")

    dt = base + timedelta(seconds=sec)

    return {
        "datetime_str": dt.strftime("%Y-%m-%d %H:%M:%S"),
        "date": dt.strftime("%Y-%m-%d"),
        "time": dt.strftime("%H:%M:%S"),
    }


# ▼ テスト実行
if __name__ == "__main__":
    print(F_ConvertSecondsToDatetime("2024-01-01", 93615))