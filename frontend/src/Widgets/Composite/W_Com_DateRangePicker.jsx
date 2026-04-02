/**
 * @component W_C_DateRangePicker
 * @description
 *   日付範囲入力（開始〜終了）を 7:3 レイアウトで配置したコンポーネント。
 *   - 左：ラベル（7）
 *   - 右：日付範囲入力（3）
 *   - テーマ完全準拠
 */

import { W_D_Label, W_D_Value } from "../Display";
import { W_I_DateInput } from "../Inputs";

export default function W_Com_DateRangePicker({
    label = "期間",
    startValue = "",
    endValue = "",
    onStartChange,
    onEndChange,
}) {

    return (
        <div className="grid grid-cols-[7fr_3fr] items-center gap-3 w-full">

            {/* ラベル */}
            <W_D_Label text={label} />

            {/* 入力エリア */}
            <div className="flex items-center gap-2">
                <W_I_DateInput
                    value={startValue}
                    onChange={onStartChange}
                    className="w-[120px]"
                />

                <W_D_Value
                    value="～"
                    className="text-[var(--ui-text-sub)] shrink-0"
                />

                <W_I_DateInput
                    value={endValue}
                    onChange={onEndChange}
                    className="w-[120px]"
                />
            </div>
        </div>
    );
}
