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


export default function W_I_DateInput({ value, onChange, className = "" }) {
    return (
        <div
            className={`
                relative
                border border-[var(--ui-card-border)]
                bg-[var(--ui-card)]
                rounded-md shadow-sm
                overflow-hidden
                ${className}
            `}
        >
            <input
                type="date"
                value={value}
                onChange={onChange}
                className="
                    w-full
                    p-2
                    bg-transparent
                    text-[var(--ui-text)]
                    appearance-none
                    focus:outline-none
                "
            />
        </div>
    );
}
