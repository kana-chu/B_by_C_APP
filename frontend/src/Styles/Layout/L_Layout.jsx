/**
 * @component L_Layout
 * @description
 *   ページヘッダーを強調し、
 *   Homeにもどるボタンを備えた共通レイアウト。
 *   ui-* テーマに完全準拠し、ライト／ダーク自動対応。
 */

export default function L_Layout({
    title,
    children,
    onHome,     // ★ Homeに戻る処理を外から渡す
}) {
    return (
        <div className="min-h-screen w-full flex justify-center bg-[var(--ui-app)]">
            <div
                className="
          w-[1000px] h-[830px]
          bg-[var(--ui-card)]
          rounded-md shadow-xl
          border border-[var(--ui-card-border)]
          overflow-hidden
        "
            >
                {/* ★ 強調版ページヘッダー */}
                <div
                    className="
            h-[80px]
            mx-4 mt-4 px-6
            rounded-md
            flex items-center justify-between
            shadow-lg
            bg-[var(--ui-header-strong)]
            text-[var(--ui-header-text-strong)]
            border-b-4 border-[var(--ui-header-border-strong)]
          "
                >
                    {/* 左：タイトル */}
                    <h1 className="text-xl font-bold font-meiryo tracking-wide">
                        {title}
                    </h1>

                    {/* 右：Homeにもどるボタン */}
                    {onHome && (
                        <button
                            type="button"
                            onClick={onHome}
                            className="
                px-3 py-1.5
                rounded-md
                text-sm font-meiryo
                bg-[var(--ui-btn)]
                text-[var(--ui-btn-text)]
                hover:bg-[var(--ui-btn-hover)]
                transition
                shadow-[0_1px_2px_rgba(0,0,0,0.08)]
              "
                        >
                            Homeにもどる
                        </button>
                    )}
                </div>

                {/* 内枠（コンテンツ） */}
                <div
                    className="
            w-[850px] h-[800px]
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
