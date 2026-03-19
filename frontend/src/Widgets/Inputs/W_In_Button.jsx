/**
 * @component W_I_Button
 * @folder Widgets/Inputs
 * @category Inputs
 * @description ボタン入力ウィジェット（決定、実行などに利用）
 *
 * @usage
 * ```jsx
 * <W_I_Button label="実行" onClick={handleClick} />
 * ```
 *
 * @export default
 */

export default function W_In_Button({ label, onClick, type = "button" }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 active:scale-95 transition"
        >
            {label}
        </button>
    );
}