/**
 * @component W_Feed_Mess_Success
 * @folder Widgets/FeedBack/Message
 * @category Widgets
 * @description 成功メッセージ（緑背景）を表示するUI。
 *
 * @usage
 * ```jsx
 * <W_Feed_Mess_Success text="正常に完了しました。" />
 * ```
 *
 * @export default
 */

import { W_Dis_Text } from "../../Display";

export default function W_Feed_Mess_Success({ text }) {
    return (
        <div className="p-3 rounded-md bg-green-100 border border-green-300 text-green-800">
            <W_Dis_Text text={text} />
        </div>
    );
}