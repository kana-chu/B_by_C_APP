/**
 * @component W_C_DateRangePicker
 * @folder Widgets/Composite
 * @category Composite
 * @description
 *   以下の要素が横に並ぶ複合コンポーネント：
 *     - ラベル（W_D_Label）
 *     - 開始日入力（W_I_DateInput）
 *     - "～" 表示（W_D_Value）
 *     - 終了日入力（W_I_DateInput）
 *
 * @usage
 * ```jsx
 * <W_C_DateRangePicker
 *    label="選択した元データの期間"
 *    startValue={start}
 *    endValue={end}
 *    onStartChange={(e) => setStart(e.target.value)}
 *    onEndChange={(e) => setEnd(e.target.value)}
 * />
 * ```
 *
 * @export default
 */

import { W_D_Label, W_D_Value } from "../Display";
import { W_I_DateInput } from "../Inputs";

export default function W_C_DateRangePicker({
    label = "期間",
    startValue = "",
    endValue = "",
    onStartChange,
    onEndChange,
}) {
    return (
        <div className="flex items-center gap-4 w-full">

            {/* 左側ラベル */}
            <div className="min-w-50">
                <W_D_Label text={label} />
            </div>

            {/* 開始日 */}
            <W_I_DateInput value={startValue} onChange={onStartChange} />

            {/* 区切り "～" */}
            <W_D_Value value="～" className="border-none bg-transparent shadow-none" />

            {/* 終了日 */}
            <W_I_DateInput value={endValue} onChange={onEndChange} />

        </div>
    );
}
``