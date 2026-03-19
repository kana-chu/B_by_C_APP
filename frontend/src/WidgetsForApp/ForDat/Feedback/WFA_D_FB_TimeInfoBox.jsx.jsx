/**
 * @component WFA_D_F_TimeInfoBox
 * @folder WidgetsForApp/ForDat/Feedback
 * @category WidgetsForApp
 * @description
 *   DAT アプリ固有の「秒データ → 各種時間情報」表示コンポーネント。
 *   以下 3 種類の情報を横一列で表示する：
 *     - 取得データ（秒）
 *     - 時間 / 分換算
 *     - 年月日時分換算
 *
 *   Widgets/Display の W_D_Label & W_D_Value を再利用し、
 *   アプリ固有の業務ロジックのみを内部に持つ。
 *
 * @usage
 * ```jsx
 * <WFA_D_F_TimeInfoBox
 *    header="ヘッダー記載の秒数一覧表示"
 *    seconds={totalSeconds}
 * />
 * ```
 *
 * @remarks
 *   - seconds は正の整数を想定。
 *   - グリッド横並びレイアウト（3等分）で表示。
 *
 * @export default
 */

import { W_D_Label, W_D_Value } from "../../../Widgets/Display";

export default function WFA_D_Fb_TimeInfoBox({
    header = "",
    seconds = 0,
}) {
    // --- 計算処理 ------------------------------------------------

    // 秒 → 時間 / 分
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    // 秒 → 年月日時分（UTC基準の経過時間として扱う）
    const d = new Date(seconds * 1000);
    const y = d.getUTCFullYear();
    const m = d.getUTCMonth() + 1;
    const day = d.getUTCDate();
    const h = d.getUTCHours();
    const min = d.getUTCMinutes();

    // --- 表示 -----------------------------------------------------

    return (
        <div className="flex flex-col gap-3 w-full">

            {/* ヘッダー */}
            {header && <W_D_Label text={header} className="text-lg" />}

            {/* 3 カラム横並びグリッド */}
            <div className="grid grid-cols-3 gap-4 w-full">

                {/* 1列目：取得データ（秒） */}
                <div className="flex flex-col">
                    <W_D_Label text="取得データ" />
                    <W_D_Value value={`${seconds} 秒`} />
                </div>

                {/* 2列目：時間・分換算 */}
                <div className="flex flex-col">
                    <W_D_Label text="時間、分換算" />
                    <W_D_Value value={`${hours} 時間 ${minutes} 分`} />
                </div>

                {/* 3列目：年月日時分換算 */}
                <div className="flex flex-col">
                    <W_D_Label text="年月日時分換算" />
                    <W_D_Value value={`${y}年 ${m}月 ${day}日 ${h}時 ${min}分`} />
                </div>

            </div>
        </div>
    );
}