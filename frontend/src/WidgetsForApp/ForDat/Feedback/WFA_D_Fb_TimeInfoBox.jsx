/**
 * @component WFA_D_Fb_TimeInfoBox
 * @folder WidgetsForApp/ForDat/Feedback
 * @category WidgetsForApp
 * @description
 *   timeInfoList（sec,hms,datetime）をテーマ準拠で表示するテーブル。
 *   ・ヘッダー色 / 枠線 / 行背景すべて var(--ui-xxx) に統一
 *   ・ライト／ダーク自動対応
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
                <W_Dis_Label
                    text={header}
                    className="text-lg mb-1 text-[var(--ui-text)]"
                />
            )}

            {/* 外枠（角丸＋テーマ枠線＋背景） */}
            <div
                className="
                    rounded-lg shadow
                    bg-[var(--ui-card)]
                    border border-[var(--ui-card-border)]
                "
            >

                {/* ▼ ヘッダー（テーマ水色） */}
                <div
                    className="
                        grid
                        grid-cols-[15ch_20ch_auto]
                        px-4 py-2
                        font-bold text-xs border-b
                        border-[var(--ui-card-border)]
                        bg-[var(--ui-table-header)]
                        text-[var(--ui-table-header-text)]
                    "
                >
                    <span>取得データ</span>
                    <span>時間・分換算</span>
                    <span>年月日時分換算</span>
                </div>

                {/* ▼ 本体（固定高さスクロール） */}
                <div
                    className="
                        overflow-y-auto
                        text-xs
                        scrollbar-thin
                        scrollbar-thumb-gray-400
                        scrollbar-track-gray-200
                    "
                    style={{ height: "180px" }}
                >
                    {timeInfoList.map((row, i) => (
                        <div
                            key={i}
                            className="
                                grid
                                grid-cols-[15ch_20ch-auto]
                                px-4 py-2
                                border-b last:border-b-0
                                border-[var(--ui-table-border)]
                                text-[var(--ui-text)]
                            "
                            style={{
                                backgroundColor:
                                    i % 2 === 0
                                        ? "var(--ui-table-even)"  // 偶数行ベージュ
                                        : "transparent",           // 奇数行
                            }}
                        >
                            <div className="whitespace-nowrap overflow-hidden truncate">
                                {row.sec} 秒
                            </div>
                            <div className="whitespace-nowrap overflow-hidden truncate">
                                {row.hms}
                            </div>
                            <div className="whitespace-nowrap overflow-hidden truncate">
                                {row.datetime}
                            </div>
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