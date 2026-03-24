"""
@component F_ConvertSeconds
@folder backend/Feature
@category DataProcessing
@description
    秒数（int または float）を、
    ・〇d〇h〇m〇s 表示（days, hours, minutes, seconds）
    ・〇h〇m〇s 表示（total hours, minutes, seconds）
    の2種類のテキスト形式に変換する関数を提供するユーティリティ。

@params
    seconds : int | float
        変換対象となる秒数（各ブロック先頭行の1列目）

@return
    dict {
        "d_h_m_s" : str,    # 例: "1d 02h 30m 15s"
        "h_m_s"   : str,    # 例: "26h 30m 15s"
    }

@usage
    from Feature.F_ConvertSeconds import F_ConvertSeconds
    info = F_ConvertSeconds(93615)  # 1日2時間30分15秒
    print(info["d_h_m_s"])
    print(info["h_m_s"])

@remarks
    - 秒数が float の場合は int に丸めて処理
    - 負の秒数の場合は絶対値で処理し、"-" を前につける
"""

def F_ConvertSeconds(seconds):

    # ▼ 安全処理
    if seconds is None:
        return {"d_h_m_s": "", "h_m_s": ""}

    # ▼ float → int
    try:
        sec = int(seconds)
    except:
        return {"d_h_m_s": "", "h_m_s": ""}

    # ▼ 負の秒数対応
    sign = "-" if sec < 0 else ""
    sec = abs(sec)

    # ▼ d h m s 形式（days + hours）
    days = sec // 86400
    rem = sec % 86400
    hours = rem // 3600
    rem %= 3600
    minutes = rem // 60
    seconds = rem % 60

    d_h_m_s = f"{sign}{days}d {hours:02d}h {minutes:02d}m {seconds:02d}s"

    # ▼ total hours 版（days→hoursへ）
    total_hours = days * 24 + hours
    h_m_s = f"{sign}{total_hours}h {minutes:02d}m {seconds:02d}s"

    return {
        "d_h_m_s": d_h_m_s,
        "h_m_s": h_m_s,
    }


# ======================================================
# ▼ テスト実行
# ======================================================
if __name__ == "__main__":

    test_value = 601200  # 1d 2h 30m 15s テスト時はここを書き換え!!!!!
    result = F_ConvertSeconds(test_value)

    print("=== F_ConvertSeconds テスト ===")
    print(f"入力秒数      : {test_value}")
    print(f"d_h_m_s 表示 : {result['d_h_m_s']}")
    print(f"h_m_s   表示 : {result['h_m_s']}")