/**
 * @component Mod_Api_Dat_ChangeScale
 * @folder Modules/Api/Dat
 * @category API
 * @description
 *   Dat モジュールの「等倍計算」処理をバックエンドへ送信して実行する。
 *   FastAPI の /dat/change-scale エンドポイントと通信する。
 *
 * @params
 *   file        : File
 *   savePath    : string
 *   startDate   : string
 *   endDate     : string
 *   calcStart   : string
 *   calcEnd     : string
 *   multiplier  : number
 *
 * @return Promise<{
 *   message: string,
 *   blocks?: number,
 *   secondsList?: number[]
 * }>
 *
 * @usage
 *   const result = await Mod_Api_Dat_ChangeScale({...});
 *
 * @export
 */

import { apiPost } from "../Mod_Api_Client";
import { Mod_Api_Dat_Form_ChangeScale } from "./Form/Mod_Api_Dat_Form_ChangeScale";

export async function Mod_Api_Dat_ChangeScale(params) {
    const fd = Mod_Api_Dat_Form_ChangeScale(params);
    return await apiPost("http://localhost:8000/dat/change-scale", fd);
}