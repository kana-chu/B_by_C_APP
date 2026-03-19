/**
 * @component W_In_Toggle
 * @folder Widgets/Inputs
 * @category Widgets
 * @description
 *   ON/OFF の切替ができる汎用トグルスイッチ。
 *   チェックボックスをベースに Tailwind v4 スタイリング。
 *
 * @usage
 * ```jsx
 * <W_In_Toggle
 *    checked={value}
 *    onChange={(v) => setValue(v)}
 * />
 * ```
 *
 * @export default
 */

export default function W_In_Toggle({ checked, onChange, className = "" }) {
    return (
        <button
            onClick={() => onChange(!checked)}
            type="button"
            className={`
                        relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors
                        ${checked ? "bg-blue-600" : "bg-gray-300"}
                        ${className}
                    `}
        >
            <span
                className={`
                            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition
                            ${checked ? "translate-x-5" : "translate-x-0"}
                            `}
            />
        </button>
    );
}
