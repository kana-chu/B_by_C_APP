/**
 * @component WFA_D_Fb_TimeInfoBox
 * @folder WidgetsForApp/ForDat/Feedback
 * @category WidgetsForApp
 * @description
 *   Python バックエンドから受け取った timeInfoList（sec,hms,datetime）を
 *   3カラムテーブルでスクロール表示する。
 *
 * @usage
 * ```jsx
 * <WFA_D_Fb_TimeInfoBox
 *    header="ヘッダー記載の秒数一覧表示"
 *    timeInfoList={[
 *        { sec:100, hms:"0h 01m 40s", datetime:"2024-01-01 00:01:40" },
 *    ]}
 * />
 * ```
 *
 * @export default
 */

import { W_Dis_Label } from "../../../Widgets/Display";

export default function WFA_D_Fb_TimeInfoBox({
    header = "",
    timeInfoList = [],
}) {

    return (
        <div className="flex flex-col gap-3 w-full">

            {header && (
                <W_Dis_Label text={header} className="text-lg mb-1" />
            )}

            <div className="border rounded-lg bg-white shadow overflow-hidden">

                {/* ヘッダー */}
                <div
                    className="
                        grid
                        grid-cols-[15ch_20ch_auto]
                        bg-gray-100
                        px-4
                        py-2
                        font-bold
                        text-xs border-b
                    "
                >
                    <span>取得データ</span>
                    <span>時間・分換算</span>
                    <span>年月日時分換算</span>
                </div>

                {/* 本体 */}
                <div
                    className="
                        overflow-y-scroll
                        h-100
                        scrollbar-thin
                        scrollbar-thumb-gray-400
                        scrollbar-track-gray-200
                        text-xs
                    "
                >
                    {timeInfoList.map((row, i) => (
                        <div
                            key={i}
                            className="
                                grid
                                grid-cols-[15ch_20ch_auto]
                                px-4 py-2
                                border-b last:border-b-0
                            "
                        >
                            <div>{row.sec} 秒</div>
                            <div>{row.hms}</div>
                            <div>{row.datetime}</div>
                        </div>
                    ))}

                    {timeInfoList.length === 0 && (
                        <div className="px-4 py-2 text-gray-400">
                            データがありません
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}