/**
 * @component W_Feed_Progress
 * @folder Widgets/FeedBack
 * @category Widgets
 * @description
 *   ui-* CSS変数に完全準拠した進捗バー。
 *   ・バー色      : --ui-progress-fill
 *   ・背景        : --ui-progress-bg
 *   ・ラベル/数値 : --ui-text
 *   ・light / dark 両対応
 */

import { W_Dis_Label, W_Dis_Value } from "../../Display";

export default function W_Feed_Progress({ label = "progress", value = 0 }) {
    const safeValue = Math.min(100, Math.max(0, value)); // 0〜100 に丸め

    return (
        <div className="flex flex-col gap-2 w-full">

            {/* 上段：ラベル + 数値 */}
            <div className="flex items-center gap-4">
                <W_Dis_Label
                    text={label}
                    className="text-[var(--ui-text)]"
                />
                <W_Dis_Value
                    value={`${safeValue}%`}
                    className="border-none shadow-none bg-transparent text-[var(--ui-text)]"
                />
            </div>

            {/* 下段：進捗バー */}
            <div
                className="
                        w-full h-4
                        bg-[var(--ui-progress-bg)]
                        rounded-md overflow-hidden
                    "
            >
                <div
                    className="
                            h-full
                            bg-[var(--ui-progress-fill)]
                            transition-[width]
                        "
                    style={{ width: `${safeValue}%` }}
                />
            </div>
        </div>
    );
}