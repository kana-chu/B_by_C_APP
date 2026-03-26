/**
 * @component W_Feed_Mess_Warning
 * @folder Widgets/FeedBack/Message
 * @category Widgets
 * @description
 *   ui-* CSS変数に完全準拠した “柔らか注意メッセージ”。
 *   黄色すぎず、UI 全体と調和するクリーム警告カード。
 *   ・light / dark 両対応
 */

import { W_Dis_Text } from "../../Display";

export default function W_Feed_Mess_Warning({ text = "" }) {
    return (
        <div
            className="
                p-3 rounded-md shadow-sm
                bg-[var(--ui-warning)]
                border border-[var(--ui-warning-border)]
            "
        >
            <W_Dis_Text
                text={text}
                className="text-[var(--ui-warning-text)]"
            />
        </div>
    );
}