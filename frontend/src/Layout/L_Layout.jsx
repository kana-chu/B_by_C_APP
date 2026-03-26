/**
 * @component L_LayoutLayout
 * @category L_LayoutLayout
 * @description
 *   アプリ全体の共通レイアウト。
 *   ヘッダー右側に「Homeにもどる」ボタンを配置。
 *
 * @export default
 */

import { W_In_Button } from "../../Widgets/Inputs";

export default function L_Layout({ title, children, onHome }) {
    return (
        <div
            className="
                min-h-screen w-full
                flex justify-center
                bg-[var(--ui-app)]
            "
        >
            {/* 外枠：アプリカード */}
            <div
                className="
                    w-[1000px] h-[700px]
                    bg-[var(--ui-card)]
                    border border-[var(--ui-card-border)]
                    shadow-lg
                    overflow-hidden
                "
            >
                {/* タイトルバー */}
                <div
                    className="
                        h-[30px]
                        mx-4 mt-4 px-4
                        flex items-center justify-between
                        rounded-md shadow
                        bg-[var(--ui-header)]
                        border border-[var(--ui-card-border)]
                    "
                >
                    {/* 左：タイトル */}
                    <h1
                        className="
                            font-bold font-meiryo
                            text-lg
                            text-[var(--ui-header-text)]
                        "
                    >
                        {title}
                    </h1>

                    {/* 右：Home ボタン */}
                    {onHome && (
                        <W_In_Button
                            label="Homeにもどる"
                            size="sm"
                            onClick={onHome}
                        />
                    )}
                </div>

                {/* コンテンツエリア */}
                <div
                    className="
                        w-[850px] h-[650px]
                        mx-auto p-5
                        text-xs
                        text-[var(--ui-text)]
                    "
                >
                    {children}
                </div>
            </div>
        </div>
    );
}