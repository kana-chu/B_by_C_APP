/**
 * @component W_I_DateInput
 * @folder Widgets/Inputs
 * @category Widgets
 * @description
 *   テーマカラー（var(--ui-xxx)）に完全準拠し、
 *   ネイティブのカレンダーアイコン背景問題を100%解決した日付入力。
 *
 * @export default
 */

export default function W_I_DateInput({ label, value, onChange }) {
    return (
        <div className="flex flex-col gap-1 w-full">
            {label && (
                <label className="font-medium text-[var(--ui-text)]">
                    {label}
                </label>
            )}

            {/* ★ 外枠（角丸・枠線・背景 統一） */}
            <div
                className="
                    relative flex items-center
                    border border-[var(--ui-card-border)]
                    bg-[var(--ui-card)]
                    rounded-md shadow-sm
                    overflow-hidden
                "
            >
                {/* ★ ネイティブUIをほぼ透明化 */}
                <input
                    type="date"
                    value={value}
                    onChange={onChange}
                    className="
                        w-full p-2 pr-10
                        bg-transparent
                        text-[var(--ui-text)]
                        rounded-none
                        appearance-none
                        focus:outline-none
                    "
                />

                {/* ★ 右側カレンダーアイコン（UIテーマのボタン色） */}
                <div
                    className="
                        absolute right-0 top-0 h-full w-8
                        flex items-center justify-center
                        bg-[var(--ui-btn)]
                        hover:bg-[var(--ui-btn-hover)]
                        text-[var(--ui-btn-text)]
                        transition
                        pointer-events-none
                    "
                >
                    📅
                </div>
            </div>
        </div>
    );
}