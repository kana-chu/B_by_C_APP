/**
 * @component W_Com_LabelButton
 * @folder Widgets/Composite
 * @category Widgets
 * @description
 *   左にラベル、右にボタン（Button）を配置した
 *   汎用コンポジット。
 *   Widgets/Display（W_Dis_Label）
 *   Widgets/Inputs（W_In_Button）
 *   を組み合わせて構成。
 *
 * @usage
 * ```jsx
 * <W_Com_LabelButton
 *    label="実行"
 *    buttonLabel="開始"
 *    onClick={handleStart}
 * />
 * ```
 *
 * @export default
 */

import { W_Dis_Label } from "../Display";
import { W_In_Button } from "../Inputs";

export default function W_Com_LabelButton({
    label,
    buttonLabel,
    onClick,
}) {
    return (
        <div className="flex items-center gap-4 w-full">

            {/* 左ラベル */}
            <div className="min-w-45">
                <W_Dis_Label text={label} />
            </div>

            {/* 右ボタン */}
            <W_In_Button
                label={buttonLabel}
                onClick={onClick}
            />
        </div>
    );
}