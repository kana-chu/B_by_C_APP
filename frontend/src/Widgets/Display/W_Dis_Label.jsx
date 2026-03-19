/**
 * @component W_D_Label
 * @folder Widgets/Display
 * @category Display
 * @description ラベル表示用の UI
 *
 * @usage
 * ```jsx
 * <W_D_Label text="ファイルパス" />
 * ```
 *
 * @export default
 */

export default function W_D_Label({ text, className = "" }) {
    return <label className={`font-medium ${className}`}>{text}</label>;
}