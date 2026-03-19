/**
 * @component W_D_○○
 * @category Display
 * @folder Widgets/Display
 * @description 表示専用 UI コンポーネント
 * @export default
 */

export default function W_D_Text({ text, className = "" }) {
  return <p className={`text-sm ${className}`}>{text}</p>;
}