/**
 * @component W_Com_LabelSelectBox
 * @folder Widgets/Composite
 * @category Widgets
 * @description
 *   上段にラベル、下段にセレクトボックス（または選択ボタン）を配置した
 *   汎用コンポジット。options は {label, value} の配列として扱う。
 *
 * @export default
 */

import { W_Dis_Label } from "../Display";
import { W_In_SelectBox, W_In_Button } from "../Inputs";

export default function W_Com_LabelSelectBox({
    label,
    value = "",
    onChange,
    options = [],          // { label, value } の配列
    onOpenDialog,
    styleWidth = "100%",   // セレクトボックス幅を外から指定可能
}) {
    return (
        <div className="flex flex-col gap-2 w-full">

            {/* ▼ 上段ラベル */}
            <W_Dis_Label text={label} />

            {/* ▼ 下段 UI */}
            <div className="flex items-center gap-2 w-full">

                <W_In_SelectBox
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    options={options}
                    styleWidth={styleWidth}
                />

                {onOpenDialog && (
                    <W_In_Button label="選択" onClick={onOpenDialog} />
                )}
            </div>
        </div>
    );
}