/**
 * @component L_Layout
 * @description
 *   ページヘッダーを強調し、
 *   Homeにもどる／一つ戻るボタンを備えた共通レイアウト。
 *   ui-* テーマに完全準拠し、ライト／ダーク自動対応。
 *
 *   右下に「?」アイコンを表示し、
 *   押下すると汎用の追加ウインドウを表示する。
 */

import { useState } from "react";

export default function L_Layout({
    title,
    children,
    onHome,
    onBack,
    extraWindowContent,   // ★ 追加ウインドウ中身
}) {
    const [isExtraOpen, setIsExtraOpen] = useState(false);

    return (
        <div className="min-h-screen w-full flex justify-center bg-[var(--ui-app)]">
            <div
                className="
                    w-[1000px] h-[1500px]
                    bg-[var(--ui-card)]
                    rounded-md shadow-xl
                    border border-[var(--ui-card-border)]
                    overflow-hidden
                "
            >
                {/* ===== ヘッダー ===== */}
                <div
                    className="
                        relative
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
                    <h1 className="text-xl font-bold font-meiryo tracking-wide">
                        {title}
                    </h1>

                    <div className="flex items-center gap-3">
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

                    {/* ← もどる */}
                    {onBack && (
                        <button
                            type="button"
                            onClick={onBack}
                            className="
                                absolute
                                left-4 bottom-[-40px]
                                px-2.5 py-1
                                rounded-md
                                text-[10px] font-meiryo
                                bg-[var(--ui-btn-sub)]
                                text-[var(--ui-btn-sub-text)]
                                hover:bg-[var(--ui-btn-sub-hover)]
                                transition
                                shadow
                            "
                        >
                            ← もどる
                        </button>
                    )}
                    {/* ? 追加ウインドウ */}
                    {extraWindowContent && (
                        <button
                            type="button"
                            onClick={() => setIsExtraOpen(true)}
                            className="
                                        absolute
                                        right-4 bottom-[-40px]
                                        w-7 h-7
                                        rounded-full
                                        flex items-center justify-center
                                        text-sm font-bold
                                        bg-[var(--ui-header-strong)]
                                        text-[var(--ui-header-text-strong)]
                                        hover:opacity-90
                                        transition
                                        shadow
                                    "
                            title="ヘルプ・追加情報"
                        >
                            ?
                        </button>
                    )}
                </div>

                {/* ===== メインコンテンツ ===== */}
                <div
                    className="
                        w-[850px] h-[800px]
                        mx-auto p-5 mt-10
                        text-xs
                        text-[var(--ui-text)]
                    "
                >
                    {children}
                </div>
            </div>

            {/* ===== 追加ウインドウ（汎用） ===== */}
            {isExtraOpen && (
                <div
                    className="
                        fixed inset-0
                        bg-black/40
                        flex items-center justify-center
                        z-50
                    "
                    onClick={() => setIsExtraOpen(false)}
                >
                    <div
                        className="
                            w-[700px] max-h-[80vh]
                            bg-[var(--ui-card)]
                            rounded-md shadow-xl
                            border border-[var(--ui-card-border)]
                            p-6
                            overflow-y-auto
                        "
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* 閉じる */}
                        <div className="flex justify-end mb-2">
                            <button
                                onClick={() => setIsExtraOpen(false)}
                                className="
                                    text-lg font-bold
                                    text-[var(--ui-text-sub)]
                                    hover:text-[var(--ui-text)]
                                "
                            >
                                ×
                            </button>
                        </div>

                        {/* ★ 中身は完全に外部注入 */}
                        {extraWindowContent}
                    </div>
                </div>
            )}
        </div>
    );
}
``