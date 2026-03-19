/**
 * @component W_Com_LabelCheckbox
 * @folder Widgets/Composite
 * @category Widgets
 * @description
 *   左にラベル、右にチェックボックスを配置した汎用コンポジット。
 *
 * @usage
 * ```jsx
 * <W_Com_LabelCheckbox
 *    label="有効化"
 *    checked={isEnabled}
 *    onChange={setIsEnabled}
 * />
 * ```
 *
 * @export default
 */

import { W_Dis_Label } from "../Display";
import { W_In_Checkbox } from "../Inputs";

export default function W_Com_LabelCheckbox({
    label,
    checked,
    onChange,
}) {
    return (
        <div className="flex items-center gap-4 w-full">

            {/* 左側ラベル */}
            <div className="min-w-45">
                <W_Dis_Label text={label} />
            </div>

            {/* 右側チェックボックス */}
            <W_In_Checkbox
                checked={checked}
                onChange={onChange}
            />
        </div>
    );
}