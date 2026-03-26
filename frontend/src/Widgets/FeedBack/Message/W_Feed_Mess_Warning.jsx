/**
 * @component W_Feed_Mess_Warning
 * @folder Widgets/FeedBack/Message
 * @category Widgets
 * @description
 *   テーマに完全準拠した “柔らか注意メッセージ”。
 *   黄色すぎず、UI 全体と調和するクリーム警告カード。
 *
 * @export default
 */

import { W_Dis_Text } from "../../Display";

export default function W_Feed_Mess_Warning({ text }) {
    return (
        <div
            className="
                p-3 rounded-md
                bg-[#F8F1D6]             /* ★ 柔らかクリーム警告背景 */
                border border-[#E0D5B8]  /* ★ 薄いベージュ枠線 */
                text-[#5B4A2E]           /* ★ 読みやすいブラウン文字 */
                shadow-sm
            "
        >
            <W_Dis_Text text={text} />
        </div>
    );
}