/**
 * @component W_In_Button
 * @folder Widgets/Inputs
 * @category Inputs
 * @description
 *   ボタン入力ウィジェット（決定・実行など）。
 *   二重クリック防止機能を内蔵しており、クリック後は自動で一時的に無効化される。
 *
 * @usage
 * ```jsx
 * <W_In_Button
 *    label="実行"
 *    onClick={handleClick}
 * />
 * ```
 *
 * @remarks
 *   - 二重クリック防止は内部で 1 回のみ onClick を実行し、すぐに一時 disable に切り替える
 *   - 自動復帰時間は default 800ms（変更可能）
 *
 * @export default
 */

import { useState } from "react";

export default function W_In_Button({
    label,
    onClick,
    type = "button",
    disableDuration = 800, // ms: 二重クリック防止のための無効化時間
}) {
    const [disabled, setDisabled] = useState(false);

    const handleClickSafe = async (e) => {
        if (disabled) return;              // ★二重クリック防止

        setDisabled(true);                 // 一時無効化

        try {
            await onClick?.(e);            // ユーザー定義イベント実行
        } finally {
            // 一定時間経過後に有効化
            setTimeout(() => setDisabled(false), disableDuration);
        }
    };

    return (
        <button
            type={type}
            onClick={handleClickSafe}
            disabled={disabled}
            className={`
                px-4 py-2 rounded-md shadow transition
                ${disabled
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"}
            `}
        >
            {label}
        </button>
    );
}