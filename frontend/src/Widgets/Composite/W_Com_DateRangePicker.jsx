/**
 * @component W_C_DateRangePicker
 * @description
 *   日付範囲入力を UI テーマに合わせて最適化したコンポーネント。
 *   - 枠線色 / テキスト色 / 背景色すべてテーマ対応
 *   - 角ズレ防止（親で rounded-md、childは rounded-none）
 *   - 「～」記号もテーマのサブテキストカラーで統一
 */

import { W_D_Label, W_D_Value } from "../Display";
import { W_I_DateInput } from "../Inputs";

export default function W_C_DateRangePicker({
    label = "期間",
    startValue = "",
    endValue = "",
    onStartChange,
    onEndChange,
}) {
    return (
        <div className="flex items-center gap-4 w-full">

            {/* 左ラベル */}
            <div className="min-w-50 text-[var(--ui-text)]">
                <W_D_Label text={label} />
            </div>

            {/* 開始日入力（角ズレ防止の枠） */}
            <div
                className="
                    border border-[var(--ui-card-border)]
                    bg-[var(--ui-card)]
                    rounded-md shadow-sm overflow-hidden
                    px-1
                "
            >
                <W_I_DateInput
                    value={startValue}
                    onChange={onStartChange}
                    className="
                        bg-transparent
                        rounded-none
                        text-[var(--ui-text)]
                        focus:outline-none
                    "
                />
            </div>

            {/* 区切り：～ */}
            <W_D_Value
                value="～"
                className="
                    text-[var(--ui-text-sub)]
                    bg-transparent 
                    border-none shadow-none
                "
            />

            {/* 終了日入力（同じ枠構造） */}
            <div
                className="
                    border border-[var(--ui-card-border)]
                    bg-[var(--ui-card)]
                    rounded-md shadow-sm overflow-hidden
                    px-1
                "
            >
                <W_I_DateInput
                    value={endValue}
                    onChange={onEndChange}
                    className="
                        bg-transparent
                        rounded-none
                        text-[var(--ui-text)]
                        focus:outline-none
                    "
                />
            </div>

        </div>
    );
}