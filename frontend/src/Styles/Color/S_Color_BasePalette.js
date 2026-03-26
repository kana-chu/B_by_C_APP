/**
 * @component S_Color_BasePalette
 * @folder Styles/Color
 * @category StyleDefinition
 * @description
 *   フロントエンド全体の配色を一元管理するベースパレット。
 *   色覚特性（P / D / T 各タイプ）にも配慮し、
 *   視認性が高く、かつ落ち着いた「水色 × ベージュ」テーマを採用。
 *
 *   UI レイヤー（背景 → カード → コンテンツ → 強調要素）ごとに
 *   明確な階層配色を定義することで、画面全体の一貫性と可読性を向上させる。
 *
 * @usage
 * ```js
 * import Palette from "@/Styles/Color/S_Color_BasePalette";
 *
 * const headerStyle = {
 *     backgroundColor: Palette.HEADER_BG,
 *     color: Palette.HEADER_TEXT,
 * };
 * ```
 *
 * @export default
 */

const ColorPalette = {
    /* ---------------------------------------------------------
     * Layer 0: Global Background (画面全体の背景)
     * --------------------------------------------------------- */
    APP_BG: "#F1F5F9",              // やわらかいグレー（UD対応）

    /* ---------------------------------------------------------
     * Layer 1: Card / Panel Background
     *   - 背景より手前に乗る “まとまり要素” の背景色
     * --------------------------------------------------------- */
    CARD_BG: "#FFFFFF",             // 白（UIカード）
    CARD_BORDER: "#C2CBD3",         // 青灰の枠線で浮かせる

    /* ---------------------------------------------------------
     * Layer 2: Page Header (ページ見出しバー)
     * --------------------------------------------------------- */
    HEADER_BG: "#B6CDD9",           // 落ち着いた水色（UD推奨）
    HEADER_TEXT: "#24303A",         // 読みやすい濃紺グレー

    /* ---------------------------------------------------------
     * Layer 3: Table / Content
     * --------------------------------------------------------- */
    TABLE_HEADER_BG: "#B6CDD9",     // ヘッダーと統一
    TABLE_HEADER_TEXT: "#24303A",

    TABLE_ROW_BG_EVEN: "#F5EAD6",   // 柔らかベージュ（偶数行）
    TABLE_ROW_BG_ODD: "#FFFFFF",    // 白（奇数行）
    TABLE_BORDER_ROW: "#E3E3E3",

    /* ---------------------------------------------------------
     * Layer 4: Feedback Components (Progress / Message)
     * --------------------------------------------------------- */
    FEEDBACK_MSG_BG: "#EDF4F8",     // 淡い青灰（情報メッセージ）
    FEEDBACK_MSG_BORDER: "#C2CBD3",

    PROGRESS_BG: "#E5E7EB",         // 背景（薄いグレー）
    PROGRESS_FILL: "#6CA6CF",       // 進行色（水色テーマ）

    /* ---------------------------------------------------------
     * Layer 5: Buttons (強調・行動要素)
     * --------------------------------------------------------- */
    BTN_BG: "#6CA6CF",              // 水色（落ち着いた強調）
    BTN_BG_HOVER: "#5B96C0",        // hover
    BTN_TEXT: "#FFFFFF",

    /* ---------------------------------------------------------
     * Text Colors (共通)
     * --------------------------------------------------------- */
    TEXT_MAIN: "#24303A",           // 主要文字
    TEXT_SUB: "#6B7280",            // サブ文字
    TEXT_DISABLED: "#9CA3AF",       // 非アクティブ
};

export default ColorPalette;