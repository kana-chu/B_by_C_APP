/**
 * @component W_In_Button
 * @description
 *   テーマ（var(--ui-xxx)）に完全準拠したボタン。
 *   ・固定色なし
 *   ・ミルクティー系は CSS 変数で反映
 *   ・hover/disabled も統一
 *   ・shadow はごく控えめ
 */

import { useState } from "react";

export default function W_In_Button({
    label,
    onClick,
    type = "button",
    disableDuration = 800,
}) {
    const [disabled, setDisabled] = useState(false);

    const handleClickSafe = async (e) => {
        if (disabled) return;
        setDisabled(true);
        try {
            await onClick?.(e);
        } finally {
            setTimeout(() => setDisabled(false), disableDuration);
        }
    };

    return (
        <button
            type={type}
            onClick={handleClickSafe}
            disabled={disabled}
            className={`
                px-3.5 py-1.5 rounded-md transition font-meiryo
                shadow-[0_1px_2px_rgba(0,0,0,0.05)]
                ${
                    disabled
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : `
                            bg-[var(--ui-btn)]          /* ★ ミルクティー */
                            hover:bg-[var(--ui-btn-hover)]
                            text-[var(--ui-btn-text)]
                            active:scale-95
                        `
                }
            `}
        >
            {label}
        </button>
    );
}