/**
 * @component W_Feed_Mess_Message
 * @folder Widgets/FeedBack/Message
 * @category Widgets
 * @description
 *   通常メッセージをボックス内に表示するフィードバックUI。
 *
 * @usage
 * ```jsx
 * <W_Feed_Mess_Message
 *    label="message"
 *    text="正常に完了しました。"
 * />
 * ```
 *
 * @export default
 */

import { W_Dis_Label, W_Dis_Text } from "../../Display";

export default function W_Feed_Mess_Message({
    label = "message",
    text = "",
}) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <W_Dis_Label text={label} />
            <div className="border rounded-md p-3 bg-gray-50 shadow-inner min-h-12">
                <W_Dis_Text text={text} />
            </div>
        </div>
    );
}