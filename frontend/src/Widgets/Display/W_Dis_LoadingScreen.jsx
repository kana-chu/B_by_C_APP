/**
 * @component W_Dis_LoadingScreen
 * @folder Widgets/Display
 * @category Display
 * @description
 *   アプリ全体やページ切り替え時に表示するローディング画面。
 *   中央配置されたスピナー & フェードアニメーション付き表示。
 *
 * @usage
 * ```jsx
 * <W_Dis_LoadingScreen />
 * ```
 *
 * @remarks
 *   - 画面全体を覆うフルサイズのローディング表示
 *   - animate-pulse / animate-spin を利用したアニメーション演出
 *   - 背景色/テキスト色はアプリの柔らかいUIに合わせて調整済み
 *
 * @export default
 */

export default function W_Dis_LoadingScreen() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-white animate-fadeIn">
            {/* スピナー */}
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>

            {/* メッセージ */}
            <div className="text-gray-600 text-lg animate-pulse">
                読み込み中…
            </div>
        </div>
    );
}