/**
 * @component W_In_Toggle
 * @folder Widgets/Inputs
 * @category Widgets
 * @description
 *   テーマカラー（水色 × ミルクティー × 白）に統一した
 *   柔らかいトグルスイッチ。
 *
 * @export default
 */

export default function W_In_Toggle({ checked, onChange, className = "" }) {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`
                relative inline-flex h-6 w-11 shrink-0 cursor-pointer 
                rounded-full transition-colors
                border border-[var(--ui-card-border)]
                ${checked 
                    ? "bg-[#D6C9B4]"      /* ★ ミルクティーON */ 
                    : "bg-[#E5E2DB]"}     /* ★ 柔らかグレーOFF */
                ${className}
            `}
        >
            <span
                className={`
                    pointer-events-none inline-block h-5 w-5 transform rounded-full 
                    bg-[var(--ui-card)] shadow 
                    transition-transform
                    ${checked ? "translate-x-5" : "translate-x-0"}
                `}
            />
        </button>
    );
}