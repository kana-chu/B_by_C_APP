/**
 * @component W_In_RadioGroup
 * @folder Widgets/Inputs
 * @category Widgets
 * @description
 *   ui-* CSS変数に準拠したラジオボタングループ
 *   ・ON  : ui-btn
 *   ・OFF : ui-feedback
 *   ・枠線・文字色は共通トークン
 *   ・light / dark 両対応
 */

export default function W_In_RadioGroup({
    value,
    onChange,
    options = [],
    name,
    className = "",
}) {
    return (
        <div className={`flex items-center gap-4 ${className}`}>
            {options.map((opt) => {
                const checked = value === opt.value;

                return (
                    <label
                        key={opt.value}
                        className="flex items-center gap-2 cursor-pointer text-[var(--ui-text)]"
                    >
                        {/* 外円 */}
                        <span
                            className={`
                                        h-4 w-4 rounded-full flex items-center justify-center
                                        border border-[var(--ui-card-border)]
                                        transition-colors
                                        ${checked
                                                            ? "bg-[var(--ui-btn)]"
                                                            : "bg-[var(--ui-feedback)]"}
                                    `}
                            onClick={() => onChange(opt.value)}
                        >
                            {/* 内円 */}
                            {checked && (
                                <span className="h-2 w-2 rounded-full bg-[var(--ui-btn-text)]" />
                            )}
                        </span>

                        {/* ラベル文字 */}
                        <span onClick={() => onChange(opt.value)}>
                            {opt.label}
                        </span>
                    </label>
                );
            })}
        </div>
    );
}
``