/**
 * @component L_Layout
 * @description
 *   ページヘッダーを強調し、UI全体レイヤー構造に沿って
 *   ライト／ダークテーマに自動対応したレイアウト。
 */

export default function Layout({ title, children }) {
    return (
        <div className="min-h-screen w-full flex justify-center bg-[var(--ui-app)]">

            <div
                className="
                    w-[1000px] h-[900px] 
                    bg-[var(--ui-card)]
                    rounded-md shadow-xl 
                    border border-[var(--ui-card-border)]
                    overflow-hidden
                "
            >
                {/* ★ 強調版ページヘッダー */}
                <div
                    className="
                        h-[80px]          /* ← 高さUP */
                        mx-4 mt-4 px-6
                        rounded-md
                        flex items-center 
                        shadow-lg          /* ← 影を強く */
                        bg-[var(--ui-header-strong)]  /* ← 強調カラー */
                        text-[var(--ui-header-text-strong)]
                        border-b-4 border-[var(--ui-header-border-strong)] /* ← 下線強調 */
                    "
                >
                    <h1 className="text-xl font-bold font-meiryo tracking-wide">
                        {title}
                    </h1>
                </div>

                {/* 内枠 */}
                <div className="w-[850px] h-[900px] mx-auto p-5 text-xs">
                    {children}
                </div>
            </div>
        </div>
    );
}