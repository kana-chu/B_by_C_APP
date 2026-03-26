/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],

  theme: {
    /* ============================================================
     * colors は extend の外へ！（plugin が正しく読むため）
     * ============================================================ */
    colors: {
      /* ------- Layer 0: App Background ------- */
      "ui-app": "#F1F5F9",
      "ui-app-dark": "#1E252B",

      /* ------- Layer 1: Card ------- */
      "ui-card": "#FFFFFF",
      "ui-card-dark": "#27323A",
      "ui-card-border": "#C2CBD3",
      "ui-card-border-dark": "#3A4852",

      /* ------- Layer 2: Page Header ------- */
      "ui-header": "#B6CDD9",
      "ui-header-dark": "#3D5668",
      "ui-header-text": "#24303A",
      "ui-header-text-dark": "#E4E9ED",

      "ui-header-strong": "#A8C2D1",
      "ui-header-text-strong": "#1F2F40",
      "ui-header-border-strong": "#8FA7B4",

      /* ------- Layer 3: Table ------- */
      "ui-table-header": "#B6CDD9",
      "ui-table-header-dark": "#3D5668",
      "ui-table-header-text": "#24303A",
      "ui-table-header-text-dark": "#E4E9ED",

      "ui-table-even": "#F5EAD6",
      "ui-table-even-dark": "#33404A",
      "ui-table-odd": "#FFFFFF",
      "ui-table-odd-dark": "#27323A",

      "ui-table-border": "#E3E3E3",
      "ui-table-border-dark": "#3A4852",

      /* ------- Layer 4: Feedback ------- */
      "ui-feedback": "#EDF4F8",
      "ui-feedback-dark": "#3A4A55",
      "ui-feedback-border": "#C2CBD3",
      "ui-feedback-border-dark": "#4A5A64",

      "ui-progress-bg": "#E5E7EB",
      "ui-progress-bg-dark": "#4A5560",
      "ui-progress-fill": "#6CA6CF",
      "ui-progress-fill-dark": "#7FB4CF",

      /* ------- Layer 5: Buttons（ここを書き換え） ------- */
      "ui-btn": "#ECDDC4",            // ベージュ（ライト）
      "ui-btn-hover": "#DFD0B7",      // hover
      "ui-btn-text": "#2F2F2F",       // 読みやすい濃グレー

      "ui-btn-dark": "#8D8170",       // ダークボタン
      "ui-btn-hover-dark": "#7C7365", // ダークhover
      "ui-btn-text-dark": "#EDECEC",  // ダーク文字色

      /* ------- Text ------- */
      "ui-text": "#24303A",
      "ui-text-sub": "#6B7280",
      "ui-text-disabled": "#9CA3AF",

      "ui-text-dark": "#E4E9ED",
      "ui-text-sub-dark": "#A5B2BD",
      "ui-text-disabled-dark": "#6F7A83",
    },

    extend: {
      fontFamily: {
        meiryo: ["Meiryo", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
    },
  },

  plugins: [
    /* ============================================================
     * CSS変数生成プラグイン
     * ============================================================ */
    function ({ addBase, theme }) {
      addBase({
        ":root": {
          "--ui-app": theme("colors.ui-app"),
          "--ui-card": theme("colors.ui-card"),
          "--ui-card-border": theme("colors.ui-card-border"),

          "--ui-header": theme("colors.ui-header"),
          "--ui-header-text": theme("colors.ui-header-text"),
          "--ui-header-strong": theme("colors.ui-header-strong"),
          "--ui-header-text-strong": theme("colors.ui-header-text-strong"),
          "--ui-header-border-strong": theme("colors.ui-header-border-strong"),

          "--ui-table-header": theme("colors.ui-table-header"),
          "--ui-table-header-text": theme("colors.ui-table-header-text"),
          "--ui-table-even": theme("colors.ui-table-even"),
          "--ui-table-odd": theme("colors.ui-table-odd"),
          "--ui-table-border": theme("colors.ui-table-border"),

          "--ui-feedback": theme("colors.ui-feedback"),
          "--ui-feedback-border": theme("colors.ui-feedback-border"),

          "--ui-progress-bg": theme("colors.ui-progress-bg"),
          "--ui-progress-fill": theme("colors.ui-progress-fill"),

          "--ui-btn": theme("colors.ui-btn"),
          "--ui-btn-hover": theme("colors.ui-btn-hover"),
          "--ui-btn-text": theme("colors.ui-btn-text"),

          "--ui-text": theme("colors.ui-text"),
          "--ui-text-sub": theme("colors.ui-text-sub"),
          "--ui-text-disabled": theme("colors.ui-text-disabled"),
        },

        ".dark": {
          "--ui-app": theme("colors.ui-app-dark"),
          "--ui-card": theme("colors.ui-card-dark"),
          "--ui-card-border": theme("colors.ui-card-border-dark"),

          "--ui-header": theme("colors.ui-header-dark"),
          "--ui-header-text": theme("colors.ui-header-text-dark"),
          "--ui-header-strong": "#3D5668",
          "--ui-header-text-strong": "#E4E9ED",
          "--ui-header-border-strong": "#4A5F6F",

          "--ui-table-header": theme("colors.ui-table-header-dark"),
          "--ui-table-header-text": theme("colors.ui-table-header-text-dark"),

          "--ui-table-even": theme("colors.ui-table-even-dark"),
          "--ui-table-odd": theme("colors.ui-table-odd-dark"),
          "--ui-table-border": theme("colors.ui-table-border-dark"),

          "--ui-feedback": theme("colors.ui-feedback-dark"),
          "--ui-feedback-border": theme("colors.ui-feedback-border-dark"),

          "--ui-progress-bg": theme("colors.ui-progress-bg-dark"),
          "--ui-progress-fill": theme("colors.ui-progress-fill-dark"),

          "--ui-btn": theme("colors.ui-btn-dark"),
          "--ui-btn-hover": theme("colors.ui-btn-hover-dark"),
          "--ui-btn-text": theme("colors.ui-btn-text-dark"),

          "--ui-text": theme("colors.ui-text-dark"),
          "--ui-text-sub": theme("colors.ui-text-sub-dark"),
          "--ui-text-disabled": theme("colors.ui-text-disabled-dark"),
        },
      });
    },
  ],
};
``