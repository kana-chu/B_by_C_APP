/**
 * @component W_In_Checkbox
 * @folder Widgets/Inputs
 * @category Widgets
 * @description 単体チェックボックス入力
 *
 * @export default
 */

export default function W_In_Checkbox({ checked, onChange, label, className = "" }) {
    return (
        <label className={`flex items-center gap-2 ${className}`}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="w-4 h-4"
            />
            {label}
        </label>
    );
}