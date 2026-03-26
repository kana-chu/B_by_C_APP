/**
 * @component W_D_Text
 * @category Display
 * @folder Widgets/Display
 * @description
 *   ui-* CSS変数に準拠した本文表示用 UI コンポーネント。
 *   説明文・メッセージ本文などの基本テキスト用途。
 *
 * @export default
 */

export default function W_D_Text({ text, className = "" }) {
  return (
    <p
      className={`
        text-sm
        text-[var(--ui-text)]
        ${className}
      `}
    >
      {text}
    </p>
  );
}