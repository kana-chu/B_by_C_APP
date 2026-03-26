/**
 * @component W_D_Label
 * @folder Widgets/Display
 * @category Display
 * @description
 *   ui-* CSS変数に準拠したラベル表示用 UI。
 *   デフォルトは標準テキストトーン。
 *
 * @usage
 * <W_D_Label text="ファイルパス" />
 */

export default function W_D_Label({ text, className = "" }) {
    return (
        <label
            className={`
        font-medium
        text-[var(--ui-text)]
        ${className}
      `}
        >
            {text}
        </label>
    );
}