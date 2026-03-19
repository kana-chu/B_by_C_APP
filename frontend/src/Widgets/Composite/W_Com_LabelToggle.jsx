/**
 * @component W_Com_LabelToggle
 * @folder Widgets/Composite
 * @category Widgets
 * @description
 *   左にラベル、右にトグルを配置した汎用コンポジット。
 *   Widgets/Display（W_Dis_Label）
 *   Widgets/Inputs（W_In_Toggle）
 *   を組み合わせた Label + Toggle UI。
 *
 * @usage
 * ```jsx
 * <W_Com_LabelToggle
 *    label="有効化"
 *    checked={enabled}
 *    onChange={setEnabled}
 * />
 * ```
 *
 * @export default
 */

import { W_Dis_Label } from "../Display";
import { W_In_Toggle } from "../Inputs";

export default function W_Com_LabelToggle({
    label,
    checked,
    onChange,
}) {
    return (
        <div className="flex items-center gap-4 w-full">

            {/* 左ラベル */}
            <div className="min-w-45">
                <W_Dis_Label text={label} />
            </div>

            {/* 右トグル */}
            <W_In_Toggle
                checked={checked}
                onChange={onChange}
            />
        </div>
    );
}