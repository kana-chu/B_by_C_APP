/**
 * @component W_Feed_Mess_Success
 * @folder Widgets/FeedBack/Message
 * @category Widgets
 * @description
 *   ui-* CSS変数に準拠した成功メッセージ表示UI。
 *   ・背景／枠線／文字色は success 専用トークン
 *   ・light / dark 両対応
 *
 * @usage
 * <W_Feed_Mess_Success text="正常に完了しました。" />
 */

import { W_Dis_Text } from "../../Display";

export default function W_Feed_Mess_Success({ text = "" }) {
    return (
        <div
            className="
                p-3 rounded-md
                bg-[var(--ui-success)]
                border border-[var(--ui-success-border)]
            "
        >
            <W_Dis_Text
                text={text}
                className="text-[var(--ui-success-text)]"
            />
        </div>
    );
}
