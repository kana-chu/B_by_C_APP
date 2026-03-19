/**
 * @component W_I_SelectBox
 * @folder Widgets/Inputs
 * @category Inputs
 * @description セレクトボックス（ドロップダウン）入力
 *
 * @usage
 * ```jsx
 * <W_I_SelectBox options={options} value={v} onChange={handle} />
 * ```
 *
 * @export default
 */
``

export default function W_In_SelectBox({ label, options = [], value, onChange }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="font-medium">{label}</label>

            <select
                value={value}
                onChange={onChange}
                className="border p-2 rounded-md shadow-sm"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}