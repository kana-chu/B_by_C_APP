/**
 * @component W_In_RadioGroup
 * @folder Widgets/Inputs
 * @category Widgets
 * @description ラジオボタンのグループ入力
 *
 * @export default
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
                <label key={opt.value} className="flex items-center gap-2">
                    <input
                        type="radio"
                        name={name}
                        value={opt.value}
                        checked={value === opt.value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-4 h-4"
                    />
                    {opt.label}
                </label>
            ))}
        </div>
    );
}