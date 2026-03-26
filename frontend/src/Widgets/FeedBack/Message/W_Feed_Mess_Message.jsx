/**
 * @component W_Feed_Mess_Message
 * @folder Widgets/FeedBack/Message
 * @category Widgets
 * @description
 *   ui-* CSS変数に準拠した通常メッセージ表示用フィードバックUI。
 *
 * @usage
 * ```jsx
 * <W_Feed_Mess_Message
 *   label="message"
 *   text="正常に完了しました。"
 * />
 * ```
 */

import { W_Dis_Label, W_Dis_Text } from "../../Display";

export default function W_Feed_Mess_Message({
    label = "message",
    text = "",
}) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <W_Dis_Label
                text={label}
                className="text-[var(--ui-text)]"
            />

            <div
                className="
                    border border-[var(--ui-feedback-border)]
                    rounded-md p-3 min-h-12
                    bg-[var(--ui-feedback)]
                    shadow-inner
                    "
            >
                <W_Dis_Text
                    text={text}
                    className="text-[var(--ui-text)]"
                />
            </div>
        </div>
    );
}