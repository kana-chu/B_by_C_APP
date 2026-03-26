/**
 * @component W_D_Value
 * @folder Widgets/Display
 * @category Display
 * @description
 *   値の表示専用ウィジェット。
 *   入力不可・読み取り専用の値を Card 風UIで表示する。
 *   ラベル付き／単体どちらも可能。
 *
 * @usage
 * <W_D_Value label="選択中のパス" value={path} />
 *
 * @export default
 */

export default function W_D_Value({
    label = "",
    value = "",
    className = "",
}) {
    return (
        <div className="flex flex-col gap-1 w-full">
            {label && (
                <span className="font-medium text-[var(--ui-text)]">
                    {label}
                </span>
            )}

            <div
                className={`
                    border border-[var(--ui-card-border)]
                    bg-[var(--ui-card)]
                    text-[var(--ui-text)]
                    text-sm
                    p-2 rounded-md
                    shadow-inner
                    ${className}
                    `}
            >
                {value}
            </div>
        </div>
    );
}