/**
 * @module CalcOptions
 * @description
 *   計算系オプション定義（定数）
 *   - メッシュサイズ
 *   - 既定値
 */

/* =====================================================
 * 作成メッシュサイズ
 * ===================================================== */
const CalcOptions = {
    exMeshSize: {
        defaultValue: "",
        options: [
            { label: "5m", value: "5" },
            { label: "25m", value: "25" },
            { label: "50m", value: "50" },
        ],
    },

    nationalMeshSize: {
        defaultValue: "",
        options: [
            { label: "250m(1/4地域メッシュ)", value: "250" },
            { label: "500m(1/2地域メッシュ)", value: "500" },
        ],
    },

    economicMeshSize: {
        defaultValue: "",
        options: [
            { label: "500m(1/2地域メッシュ)", value: "500" },
        ],
    },
};
export default CalcOptions;

