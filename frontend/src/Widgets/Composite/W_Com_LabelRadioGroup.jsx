/**
 * @component W_Com_LabelRadioGroup
 * @folder Widgets/Composite
 * @category Widgets
 * @description
 *   左にラベル、右にラジオボタングループを配置した汎用コンポジット。
 *
 * @usage
 * ```jsx
 * <W_Com_LabelRadioGroup
 *    label="モード"
 *    value={mode}
 *    onChange={setMode}
 *    options={[
 *      { label: "A", value: "A" },
 *      { label: "B", value: "B" },
 *    ]}
 *    name="mode"
 * />
 * ```
 *
 * @export default
 */

import { W_Dis_Label } from "../Display";
import { W_In_RadioGroup } from "../Inputs";

export default function W_Com_LabelRadioGroup({
    label,
    value,
    onChange,
    options,
    name,
}) {
    return (
        <div className="flex items-center gap-4 w-full">

            {/* 左ラベル */}
            <div className="min-w-45">
                <W_Dis_Label text={label} />
            </div>

            {/* 右ラジオグループ */}
            <W_In_RadioGroup
                value={value}
                onChange={onChange}
                options={options}
                name={name}
            />
        </div>
    );
}