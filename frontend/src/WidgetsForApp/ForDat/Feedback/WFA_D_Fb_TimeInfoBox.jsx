/**
 * @component WFA_D_Fb_TimeInfoBox
 * @folder WidgetsForApp/ForDat/Feedback
 * @category WidgetsForApp
 * @description
 *   Python バックエンドから受け取った秒数リストを
 *   「3カラムのテーブル形式」で、縦スクロールつき固定高さで表示する。
 *
 * @usage
 * ```jsx
 * <WFA_D_Fb_TimeInfoBox
 *    header="ヘッダー記載の秒数一覧表示"
 *    secondsList={[100, 3600, 7200]}
 * />
 * ```
 *
 * @export default
 */

import { W_Dis_Label } from "../../../Widgets/Display";

export default function WFA_D_Fb_TimeInfoBox({
    header = "",
    secondsList = [],
}) {
    const compute = (sec) => {
        const hours = Math.floor(sec / 3600);
        const minutes = Math.floor((sec % 3600) / 60);

        const d = new Date(sec * 1000);
        const y = d.getUTCFullYear();
        const m = d.getUTCMonth() + 1;
        const day = d.getUTCDate();
        const h = d.getUTCHours();
        const min = d.getUTCMinutes();

        return {
            sec,
            hours,
            minutes,
            formatted: `${y}年 ${m}月 ${day}日 ${h}時 ${min}分`,
        };
    };

    return (
        <div className="flex flex-col gap-3 w-full">

            {/* タイトル */}
            {header && (
                <W_Dis_Label text={header} className="text-lg mb-1" />
            )}

            {/* ==== テーブル外枠 ==== */}
            <div className="border rounded-lg bg-white shadow overflow-hidden">

                {/* ==== テーブルヘッダー ==== */}
                <div className="grid grid-cols-3 bg-gray-100 px-4 py-2 font-bold text-sm border-b">
                    <span>取得データ</span>
                    <span>時間・分換算</span>
                    <span>年月日時分換算</span>
                </div>

                {/* ==== 中身：スクロール領域 ==== */}
                <div
                    className="
            overflow-y-scroll 
            max-h-75             /* ← 10行固定高さ (1行30px x 10) */
            scrollbar-thin             /* ← 常にスクロールバー表示 */
            scrollbar-thumb-gray-400 
            scrollbar-track-gray-200
            text-sm                    /* ← 小さい文字 */
          "
                    style={{ overflowY: "scroll" }} // ← Chrome/Edge で常時スクロールバー表示
                >
                    {secondsList.map((sec, i) => {
                        const t = compute(sec);
                        return (
                            <div
                                key={i}
                                className="grid grid-cols-3 px-4 py-2 border-b last:border-b-0"
                            >
                                <div>{t.sec} 秒</div>
                                <div>{t.hours} 時間 {t.minutes} 分</div>
                                <div>{t.formatted}</div>
                            </div>
                        );
                    })}

                    {/* データ0件の場合 */}
                    {secondsList.length === 0 && (
                        <div className="px-4 py-2 text-gray-400">
                            データがありません
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}