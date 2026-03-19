/**
 * @component W_Com_LabelTextInput
 * @folder Widgets/Composite
 * @category Widgets
 * @description
 *   左にラベル、右にテキスト入力（型指定・桁数制限可能）を配置する
 *   汎用コンポジット。
 *
 *   type:
 *     - "int"     : 整数のみ
 *     - "float"   : 小数あり数値
 *     - "text"    : 任意テキスト
 *
 * @usage
 * ```jsx
 * <W_Com_LabelTextInput
 *    label="計算倍率"
 *    value={multi}
 *    onChange={setMulti}
 *    unit="倍"
 *    type="float"
 *    maxLength={6}
 * />
 * ```
 *
 * @export default
 */

import { W_Dis_Label, W_Dis_Value } from "../Display";
import { W_In_TextInput } from "../Inputs";

export default function W_Com_LabelTextInput({
    label,
    value,
    onChange,
    unit = "",
    type = "text",
    maxLength = null,
}) {
    const handleChange = (e) => {
        let v = e.target.value;

        if (type === "int") {
            v = v.replace(/[^0-9]/g, "");
        }

        if (type === "float") {
            v = v.replace(/[^0-9.]/g, "");
            v = v.replace(/(\..*)\./g, "$1");
        }

        if (maxLength !== null) v = v.slice(0, maxLength);

        onChange(v);
    };

    return (
        <div className="flex items-center gap-4 w-full">

            {/* 左ラベル */}
            <div className="min-w-45">
                <W_Dis_Label text={label} />
            </div>

            {/* 中央テキスト入力 */}
            <W_In_TextInput
                value={value}
                onChange={handleChange}
                className="w-40"
            />

            {/* 右側単位 */}
            {unit && (
                <W_Dis_Value
                    value={unit}
                    className="border-none shadow-none bg-transparent"
                />
            )}
        </div>
    );
}
``