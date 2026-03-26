/**
 * @component W_Dis_LoadingScreen
 * @folder Widgets/Display
 * @category Display
 * @description
 *   ui-* CSS変数に準拠したローディング画面。
 *   アプリ全体・ページ遷移時に表示するフルスクリーンUI。
 *
 * @usage
 * <W_Dis_LoadingScreen />
 */

export default function W_Dis_LoadingScreen() {
    return (
        <div
            className="
                w-full h-screen
                flex flex-col items-center justify-center
                bg-[var(--ui-app)]
                animate-fadeIn
            "
        >
            {/* スピナー */}
            <div
                className="
                    w-12 h-12 mb-4
                    border-4
                    border-[var(--ui-progress-bg)]
                    border-t-[var(--ui-progress-fill)]
                    rounded-full
                    animate-spin
                    "
            />

            {/* メッセージ */}
            <div
                className="
                    text-lg
                    text-[var(--ui-text-sub)]
                    animate-pulse
                    "
            >
                読み込み中…
            </div>
        </div>
    );
}