/**
 * @component W_FA_CC_ItemSheetPreviewBox
 * @folder WidgetsForApp/ForDat/ControlCheck
 * @category WidgetsForApp
 * @description
 *   項目シート（A:項目名 / B:列名 / C:セル名）の内容を
 *   3列構造でプレビュー表示する確認用コンポーネント。
 *   ・高さ指定可
 *   ・縦スクロール常時表示
 *   ・テーマ完全準拠
 */

import { W_Dis_Label } from "@/Widgets/Display";

export default function W_FA_CC_ItemSheetPreviewBox({
    header = "",
    itemList = [],
    height = "180px",
    width = "100%",
}) {
    const safeList = Array.isArray(itemList) ? itemList : [];

    return (
        <div className="flex flex-col gap-3" style={{ width }}>

            {header && (
                <W_Dis_Label
                    text={header}
                    className="text-[1.05rem] mb-1 text-[var(--ui-text)]"
                />
            )}

            {/* 外枠 */}
            <div
                className="
                    rounded-lg shadow
                    bg-[var(--ui-card)]
                    border border-[var(--ui-card-border)]
                "
            >
                {/* ヘッダー行 */}
                <div
                    className="
                        grid grid-cols-[20ch_15ch_auto]
                        px-4 py-2
                        font-bold text-xs
                        border-b
                        border-[var(--ui-card-border)]
                        bg-[var(--ui-table-header)]
                        text-[var(--ui-table-header-text)]
                    "
                >
                    <span>項目（シート名）</span>
                    <span>列名</span>
                    <span>セル名</span>
                </div>

                {/* 本体（常時スクロール） */}
                <div
                    className="
                        overflow-y-scroll
                        text-xs
                        scrollbar-thin
                        scrollbar-thumb-gray-400
                        scrollbar-track-gray-200
                    "
                    style={{ height }}
                >
                    {safeList.map((row, i) => (
                        <div
                            key={i}
                            className="
                                grid grid-cols-[20ch_15ch_auto]
                                px-4 py-2
                                border-b last:border-b-0
                                border-[var(--ui-table-border)]
                                text-[var(--ui-text)]
                            "
                            style={{
                                backgroundColor:
                                    i % 2 === 0
                                        ? "var(--ui-table-even)"
                                        : "transparent",
                            }}
                        >
                            <div className="whitespace-nowrap overflow-hidden truncate">
                                {row.sheetName}
                            </div>
                            <div className="whitespace-nowrap overflow-hidden truncate">
                                {row.columnIndex}
                            </div>
                            <div className="whitespace-nowrap overflow-hidden truncate">
                                {row.headerName}
                            </div>
                        </div>
                    ))}

                    {safeList.length === 0 && (
                        <div className="px-4 py-2 text-[var(--ui-text-sub)]">
                            データがありません
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}