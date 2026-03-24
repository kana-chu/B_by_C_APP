/**
 * @component W_In_TextInput
 * @folder Widgets/Inputs
 * @category Widgets
 * @description
 *   テキスト入力用の基本ウィジェット。
 *   ・幅はデフォルト指定しない（呼び出し側が自由に指定）
 *   ・readOnly でも見た目を保つ
 *
 * @export default
 */

export default function W_In_TextInput({
    value = "",
    onChange,
    readOnly = false,
    className = "",
}) {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            className={`
                border rounded-md px-2 py-1 shadow-sm
                ${className}
            `}
        />
    );
}