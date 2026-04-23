/**
 * @component W_In_SelectBox
 * @description
 *   枠線が欠けないように角丸を親要素に集約した
 *   完全テーマ対応 SelectBox
 */

export default function W_In_SelectBox({
    label,
    options = [],
    value,
    onChange,
    styleWidth = "100%",
}) {
    // ----------------------------
    // オプション正規化（最重要）
    // ----------------------------
    const safeOptions = Array.isArray(options) ? options : [];

    return (
        <div className="flex flex-col gap-1" style={{ width: styleWidth }}>
            {label && (
                <label className="font-medium text-[var(--ui-text)]">
                    {label}
                </label>
            )}

            {/* ★ 外枠で角丸＆枠線を一元管理 */}
            <div
                className="
                    relative flex items-center
                    border border-[var(--ui-card-border)]
                    rounded-md shadow-sm
                    bg-[var(--ui-card)]
                    text-[var(--ui-text)]
                    overflow-hidden      /* ← 重要：中身の角ズレを完全に隠す */
                "
            >
                {/* ★ Select 本体（角丸なし） */}

                <select
                    value={value}
                    onChange={onChange}
                    className="
                        appearance-none
                        w-full p-2 pr-10
                        bg-transparent
                        rounded-none
                        focus:outline-none
                    "
                >
                    {/* 初期選択 */}
                    <option value="">選択</option>

                    {/* options が空 or 不正な場合 */}
                    {safeOptions.length === 0 && (
                        <option value="" disabled>
                            選択肢がありません
                        </option>
                    )}

                    {/* 正常な options */}
                    {safeOptions.map((opt, i) => {
                        // opt の最低限バリデーション
                        if (
                            !opt ||
                            typeof opt.value === "undefined" ||
                            typeof opt.label === "undefined"
                        ) {
                            return null;
                        }

                        return (
                            <option
                                key={`${opt.value}-${i}`}
                                value={opt.value}
                                style={{
                                    backgroundColor:
                                        i % 2 === 0
                                            ? "var(--ui-table-even)"
                                            : "transparent",
                                }}
                            >
                                {opt.label}
                            </option>
                        );
                    })}
                </select>


                {/* ★ ▼ 部分（こちらも角丸禁止） */}
                <div
                    className="
                        absolute right-0 top-0 h-full w-8
                        flex items-center justify-center
                        bg-[var(--ui-btn)]
                        hover:bg-[var(--ui-btn-hover)]
                        text-[var(--ui-btn-text)]
                        rounded-none        /* ← 角丸禁止 */
                        pointer-events-none
                        transition
                    "
                >
                    ▼
                </div>
            </div>
        </div>
    );
}