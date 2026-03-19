/**
 * @component W_I_TextInput
 * @folder Widgets/Inputs
 * @category Inputs
 * @description テキスト入力ウィジェット（readOnlyにも対応）
 *
 * @usage
 * ```jsx
 * <W_I_TextInput value={text} onChange={handleChange} />
 * ```
 *
 * @export default
 */

export default function W_In_TextInput({
    label,
    value,
    onChange,
    placeholder = "",
    maxLength,
    pattern,
    type = "text",
}) {
    return (
        <div className="flex flex-col gap-1">
            <label className="font-medium">{label}</label>

            <input
                type={type}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                pattern={pattern}
                placeholder={placeholder}
                className="border p-2 rounded-md shadow-sm"
            />
        </div>
    );
}