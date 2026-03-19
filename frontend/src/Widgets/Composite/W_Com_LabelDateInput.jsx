/**
 * @component W_Com_LabelDateInput
 * @folder Widgets/Composite
 * @category Widgets
 * @description
 *   左にラベル、右に日付入力（DateInput）を配置した
 *   汎用複合ウィジェット。
 *   Widgets/Display（W_Dis_Label）
 *   Widgets/Inputs（W_In_DateInput）
 *   を組み合わせて構成。
 *
 * @usage
 * ```jsx
 * <W_Com_LabelDateInput
 *    label="開始日"
 *    value={date}
 *    onChange={(e) => setDate(e.target.value)}
 * />
 * ```
 *
 * @export default
 */

import { W_Dis_Label } from "../Display";
import { W_In_DateInput } from "../Inputs";

export default function W_Com_LabelDateInput({
    label,
    value,
    onChange,
}) {
    return (
        <div className="flex items-center gap-4 w-full">

            {/* 左ラベル */}
            <div className="min-w-45">
                <W_Dis_Label text={label} />
            </div>

            {/* 右（日付入力） */}
            <W_In_DateInput
                value={value}
                onChange={onChange}
            />
        </div>
    );
}