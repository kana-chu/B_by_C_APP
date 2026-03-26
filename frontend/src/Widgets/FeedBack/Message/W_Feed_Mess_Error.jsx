/**
 * @component W_Feed_Mess_Error
 * @folder Widgets/FeedBack/Message
 * @category Widgets
 * @description
 *   ui-* CSS変数に準拠したエラーメッセージ表示UI。
 *   ・背景／枠線／文字色は error 専用トークン
 *   ・light / dark 両対応
 *
 * @usage
 * <W_Feed_Mess_Error text="エラーが発生しました。" />
 */

import { W_Dis_Text } from "../../Display";

export default function W_Feed_Mess_Error({ text = "" }) {
    return (
        <div
            className="
                        p-3 rounded-md
                        bg-[var(--ui-error)]
                        border border-[var(--ui-error-border)]
                    "
        >
            <W_Dis_Text
                text={text}
                className="text-[var(--ui-error-text)]"
            />
        </div>
    );
}