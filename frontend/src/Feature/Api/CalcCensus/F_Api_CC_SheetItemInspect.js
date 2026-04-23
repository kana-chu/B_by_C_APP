/**
 * @component F_Api_CC_SheetNameInspect
 * @folder Modules/Api/CalcCensus
 * @category 
 * @description
 *   指定xlsxファイルのシート名のリストを返す
 *
 * @params
 *   file        : File | Blob
 *   sheet_name  : string
 *
 * @return
 *
 * @usage
 *
 *
 * @export
 */

import { apiPost } from "../Feature_Api_Client";

export async function F_Api_CC_SheetItemInspect({
    file_path,
    sheet_name,
}) {
    return await apiPost(
        "http://localhost:8000/calc-census/inspect-item-sheet",
        {
            file_path,
            sheet_name,
        }
    );
}