/**
 * @component W_Feed_Mess_Error
 * @folder Widgets/FeedBack/Message
 * @category Widgets
 * @description エラーメッセージ（赤背景）を表示するUI。
 *
 * @usage
 * ```jsx
 * <W_Feed_Mess_Error text="エラーが発生しました。" />
 * ```
 *
 * @export default
 */

import { W_Dis_Text } from "../../Display";

export default function W_Feed_Mess_Error({ text }) {
    return (
        <div className="p-3 rounded-md bg-red-100 border border-red-300 text-red-800">
            <W_Dis_Text text={text} />
        </div>
    );
}
``