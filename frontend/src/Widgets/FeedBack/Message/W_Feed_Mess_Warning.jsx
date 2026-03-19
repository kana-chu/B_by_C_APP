/**
 * @component W_Feed_Mess_Warning
 * @folder Widgets/FeedBack/Message
 * @category Widgets
 * @description 警告メッセージ（黄色背景）を表示するUI。
 *
 * @usage
 * ```jsx
 * <W_Feed_Mess_Warning text="注意が必要です。" />
 * ```
 *
 * @export default
 */

import { W_Dis_Text } from "../../Display";

export default function W_Feed_Mess_Warning({ text }) {
    return (
        <div className="p-3 rounded-md bg-yellow-100 border border-yellow-300 text-yellow-800">
            <W_Dis_Text text={text} />
        </div>
    );
}