/**
 * @component W_In_TextInput
 * @folder Widgets/Inputs
 * @category Widgets
 * @description
 *   ui-* CSS変数ベースのテキスト入力ウィジェット
 *   ・幅は指定しない
 *   ・readOnly でも見た目を保つ
 *   ・light / dark 両対応
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
                        rounded-md px-2 py-1 shadow-sm
                        border border-[var(--ui-card-border)]
                        bg-[var(--ui-card)]
                        text-[var(--ui-text)]
                        placeholder:text-[var(--ui-text-sub)]
                        focus:outline-none
                        focus:ring-2 focus:ring-[var(--ui-header-strong)]
                        ${readOnly ? "cursor-default opacity-90" : ""}
                        ${className}
                    `}
        />
    );
}