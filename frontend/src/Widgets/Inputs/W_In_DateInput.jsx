/**
 * @component W_I_DateInput
 * @folder Widgets/Inputs
 * @category Inputs
 * @description
 *   HTML 標準の date input（カレンダー入力）を使った
 *   シンプルな日付入力ウィジェット。
 *   YYYY-MM-DD のフォーマットで選択・入力が可能。
 *
 * @usage
 * ```jsx
 * <W_I_DateInput
 *    label="日付"
 *    value={date}
 *    onChange={(e) => setDate(e.target.value)}
 * />
 * ```
 *
 * @remarks
 *   - type="date" を使用（Chrome/Safari/Edge 対応）
 *   - value は必ず YYYY-MM-DD の文字列で渡してください
 *
 * @export default
 */

export default function W_In_DateInput({ label, value, onChange }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="font-medium">{label}</label>

            <input
                type="date"
                value={value}
                onChange={onChange}
                className="border p-2 rounded-md shadow-sm"
            />
        </div>
    );
}