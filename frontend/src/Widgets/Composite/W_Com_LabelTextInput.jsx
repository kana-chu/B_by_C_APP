/**
 * @component W_Com_LabelTextInput
 * @description
 *   上段にラベル、下段に「テキスト入力 + 単位」を横並びで配置する
 *   汎用コンポジット。
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
        <div className="flex flex-col gap-2 w-full">

            {/* 上段：ラベル */}
            <W_Dis_Label text={label} />

            {/* 下段：入力 + 単位 */}
            <div className="flex items-center gap-2">

                {/* テキスト入力 */}
                <W_In_TextInput
                    value={value}
                    onChange={handleChange}
                    className="w-40"
                />

                {/* 単位（ある場合のみ） */}
                {unit && (
                    <W_Dis_Value
                        value={unit}
                        className="
                            border-none
                            shadow-none
                            bg-transparent
                            text-[var(--ui-text-sub)]
                            shrink-0
                        "
                    />
                )}
            </div>

        </div>
    );
}