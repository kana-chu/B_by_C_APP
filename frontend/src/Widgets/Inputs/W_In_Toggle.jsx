/**
 * @component W_In_Toggle
 * @folder Widgets/Inputs
 * @category Widgets
 * @description
 *   ui-* CSS変数ベースのトグルスイッチ
 *   light / dark 両対応
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
                                    ? "bg-[var(--ui-btn)]"
                                    : "bg-[var(--ui-feedback)]"}
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
