/**
 * @component W_FA_CC_SheetNameBox
 * @folder WidgetsForApp/ForDat/ControlCheck
 * @category WidgetsForApp
 * @description
 *   元データファイルのシート名一覧をテーマ準拠で表示するチェック用ボックス。
 *   ・表示エリアの高さ・幅を外から指定可能
 *   ・縦スクロールバーは常に表示（overflow-y: scroll）
 *   ・ライト／ダーク両対応（ui-* 変数準拠）
 */

import { W_Dis_Label } from "@/Widgets/Display";

export default function W_FA_CC_SheetNameBox({
    header = "",
    sheetNameList = [],
    height = "180px",
    width = "100%",
}) {
    // 防御的正規化
    const safeList = Array.isArray(sheetNameList)
        ? sheetNameList
        : [];

    return (
        <div className="flex flex-col gap-3" style={{ width }}>

            {/* 見出し */}
            {/* {header && (
                <W_Dis_Label
                    text={header}
                    className="text-[1.05rem] mb-1 text-[var(--ui-text)]"
                />
            )} */}

            {/* 外枠 */}
            <div
                className="
                    rounded-lg shadow
                    bg-[var(--ui-card)]
                    border border-[var(--ui-card-border)]
                "
            >
                {/* ヘッダー */}
                {header && (
                    <div
                        className="
                                    px-4 py-2
                                    font-bold text-xs
                                    border-b
                                    border-[var(--ui-card-border)]
                                    bg-[var(--ui-table-header)]
                                    text-[var(--ui-table-header-text)]
                                "
                    >
                        {header}
                    </div>
                )}

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
                    {safeList.map((name, i) => (
                        <div
                            key={name}
                            className="
                                px-4 py-2
                                border-b last:border-b-0
                                border-[var(--ui-table-border)]
                                text-[var(--ui-text)]
                                whitespace-nowrap overflow-hidden truncate
                            "
                            style={{
                                backgroundColor:
                                    i % 2 === 0
                                        ? "var(--ui-table-even)"
                                        : "transparent",
                            }}
                        >
                            {name}
                        </div>
                    ))}

                    {safeList.length === 0 && (
                        <div className="px-4 py-2 text-[var(--ui-text-sub)]">
                            シートが存在しません
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}