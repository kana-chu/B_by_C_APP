/**
 * @component W_Com_LabelSelectBox
 * @folder Widgets/Composite
 * @category Widgets
 * @description
 *   左にラベル、右にセレクトボックス（または別ウインドウボタン）を配置した
 *   汎用コンポジット。用途を選ばず再利用可能。
 *
 * @usage
 * ```jsx
 * <W_Com_LabelSelectBox
 *    label="本計算開始時間"
 *    value={value}
 *    options={["00:00", "00:30", "01:00"]}
 *    onChange={setValue}
 *    onOpenDialog={() => openDialog()}
 * />
 * ```
 *
 * @export default
 */

import { W_Dis_Label } from "../Display";
import { W_In_SelectBox, W_In_Button } from "../Inputs";

export default function W_Com_LabelSelectBox({
    label,
    value = "",
    onChange,
    options = [],
    onOpenDialog,
}) {
    return (
        <div className="flex items-center gap-4 w-full">

            {/* 左ラベル */}
            <div className="min-w-45">
                <W_Dis_Label text={label} />
            </div>

            {/* 右側 UI */}
            <div className="flex items-center gap-2">
                {options.length > 0 && (
                    <W_In_SelectBox
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        options={options.map((x) => ({ label: x, value: x }))}
                    />
                )}

                {onOpenDialog && (
                    <W_In_Button label="選択" onClick={onOpenDialog} />
                )}
            </div>
        </div>
    );
}