/**
 * @component W_Feed_Progress
 * @folder Widgets/FeedBack
 * @category Widgets
 * @description
 *   進捗バーとパーセンテージを表示する汎用フィードバックUI。
 *   上にパーセンテージ、下に進捗バーを持つ構成。
 *
 * @usage
 * ```jsx
 * <W_Feed_Progress
 *    label="progress"
 *    value={45}   // 0〜100
 * />
 * ```
 *
 * @remarks
 *   - value は 0〜100 を想定（100 を超えると 100 に丸め）
 *
 * @export default
 */

import { W_Dis_Label, W_Dis_Value } from "../../Display";

export default function W_Feed_Pro_Bar({ label = "progress", value = 0 }) {

    const safeValue = Math.min(100, Math.max(0, value)); // 0〜100に丸め

    return (
        <div className="flex flex-col gap-2 w-full">

            {/* 上段：ラベル + %
        --------------------------- */}
            <div className="flex items-center gap-4">
                <W_Dis_Label text={label} />
                <W_Dis_Value
                    value={`${safeValue}%`}
                    className="border-none shadow-none bg-transparent"
                />
            </div>

            {/* 下段：進捗バー（横スライド）
        --------------------------- */}
            <div className="w-full h-4 bg-gray-200 rounded-md overflow-hidden">
                <div
                    className="h-full bg-blue-600 transition-all"
                    style={{ width: `${safeValue}%` }}
                />
            </div>
        </div>
    );
}