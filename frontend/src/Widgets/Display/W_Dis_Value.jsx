/**
 * @component W_D_Value
 * @folder Widgets/Display
 * @category Display
 * @description
 *   値の表示専用ウィジェット。
 *   入力不可で、読み取り専用のテキストとして値を表示する。
 *   ラベル付き or 単体でも利用できる。
 *
 * @usage
 * ```jsx
 * <W_D_Value label="選択中のパス" value={path} />
 * ```
 *
 * @remarks
 *   - 表示専用のため onChange などは不要
 *   - Tailwind クラスは className で追加可能
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
            {label && <span className="font-medium">{label}</span>}

            <div
                className={`
                    border p-2 rounded-md bg-gray-100 shadow-inner text-sm
                    ${className}
                `}
            >
                {value}
            </div>
        </div>
    );
}