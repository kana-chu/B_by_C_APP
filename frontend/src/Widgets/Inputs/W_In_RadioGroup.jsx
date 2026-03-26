/**
 * @component W_In_RadioGroup
 * @folder Widgets/Inputs
 * @category Widgets
 * @description
 *   テーマカラーに準拠した、柔らかいラジオボタングループ。
 *   ・ミルクティー系ON
 *   ・淡いクリーム系OFF
 *   ・枠線はカードと統一（青灰色）
 *   ・テキスト色も統一
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
            {options.map((opt) => (
                <label 
                    key={opt.value} 
                    className="flex items-center gap-2 cursor-pointer text-[var(--ui-text)]"
                >
                    <span
                        className={`
                            h-4 w-4 rounded-full flex items-center justify-center
                            border border-[var(--ui-card-border)]
                            transition
                            ${value === opt.value
                                ? "bg-[#ECDDC4] border-[#D4C7B3]"  /* ON → ミルクティー */
                                : "bg-[#E5E2DB]"                   /* OFF → クリームグレー */
                            }
                        `}
                        onClick={() => onChange(opt.value)}
                    >
                        {/* 中のチェック丸 */}
                        {value === opt.value && (
                            <span className="h-2 w-2 rounded-full bg-[#3C3C3C]" />
                        )}
                    </span>

                    {/* ラベル文字 */}
                    <span onClick={() => onChange(opt.value)}>
                        {opt.label}
                    </span>
                </label>
            ))}
        </div>
    );
}