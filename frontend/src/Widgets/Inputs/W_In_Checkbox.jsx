/**
 * @component W_In_Checkbox
 * @folder Widgets/Inputs
 * @category Widgets
 * @description
 *   テーマカラー（var(--ui-xxx)）100%準拠のチェックボックス。
 *   ・ON：ミルクティー（--ui-btn）
 *   ・OFF：淡ベージュ（--ui-table-even）
 *   ・枠：青灰（--ui-card-border）
 *   ・文字：テーマテキスト（--ui-text）
 *   ・ダークモードも自動対応
 *
 * @export default
 */

export default function W_In_Checkbox({
    checked,
    onChange,
    label,
    className = "",
}) {
    return (
        <label
            className={`
                flex items-center gap-2 cursor-pointer
                text-[var(--ui-text)]
                ${className}
            `}
            onClick={() => onChange(!checked)}
        >
            {/* チェックボックス本体 */}
            <span
                className={`
                    h-4 w-4 rounded-sm flex items-center justify-center
                    border border-[var(--ui-card-border)]
                    shadow-sm transition
                    ${checked
                        ? "bg-[var(--ui-btn)]"         /* ON：ミルクティー */
                        : "bg-[var(--ui-table-even)]"  /* OFF：薄ベージュ */
                    }
                `}
            >
                {/* ON のチェックアイコン */}
                {checked && (
                    <svg
                        className="h-3 w-3 text-[var(--ui-text)]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                    >
                        <path d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </span>

            {/* ラベル */}
            <span>{label}</span>
        </label>
    );
}