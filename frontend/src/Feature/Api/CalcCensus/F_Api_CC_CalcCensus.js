/**
 * @component F_Api_CC_CalcCensus
 * @folder frontend/src/Feature/Api/CalcCensus
 * @description
 *   国勢調査・経済センサス 共用の Census 計算 API 呼び出し
 *   route: POST /calc-census/execute
 *
 *   ※ バックエンド CalcCensusRequest(BaseModel) に完全準拠
 *Census 計算実行
 *
 * @param {Object} params
 * @param {string} params.file_path        元データ Excel パス
 * @param {string} params.rate_sheet       割合シート名
 * @param {string} params.item_sheet       項目シート名
 * @param {string[]} params.data_sheet_List 対象データシート配列
 * @param {string} params.census_meshSize  Census メッシュサイズ（例: "250" / "500"）
 * @param {string} params.ex_meshSize      出力メッシュサイズ
 * @param {string} params.save_path        保存先 Excel パス
 *
 * @returns {Promise<Object>}
 */

import { apiPost } from "@/Feature/Api/Feature_Api_Client";

export async function F_Api_CC_CalcCensus({
    file_path,
    rate_sheet,
    item_sheet,
    data_sheet_List,
    census_meshSize,
    ex_meshSize,
    save_path,
}) {
    return apiPost(
        "http://localhost:8000/calc-census/execute",
        {
            file_path,
            rate_sheet,
            item_sheet,
            data_sheet_List,
            census_meshSize,
            ex_meshSize,
            save_path,
        });
}