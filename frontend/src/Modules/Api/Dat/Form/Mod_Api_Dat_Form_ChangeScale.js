/**
 * @component Mod_Api_Dat_Form_ChangeScale
 * @folder Modules/Api/Dat/Form
 * @category API-Form
 * @description
 *   Dat モジュールの「等倍計算」API に送信する FormData を生成する。
 *
 * @params
 *   file        : File | Blob
 *   savePath    : string
 *   startDate   : string
 *   endDate     : string
 *   calcStart   : string
 *   calcEnd     : string
 *   multiplier  : number
 *
 * @return FormData
 *
 * @usage
 *   const fd = Mod_Api_Dat_Form_ChangeScale(params);
 *
 * @export
 */

export function Mod_Api_Dat_Form_ChangeScale({
    file_path,
    save_path,
    start_date,
    end_date,
    calc_start,
    calc_end,
    multiplier,
}) {
    const fd = new FormData();

    fd.append("file_path", file_path);
    fd.append("save_path", save_path);
    fd.append("start_date", start_date);
    fd.append("end_date", end_date);
    fd.append("calc_start", calc_start);
    fd.append("calc_end", calc_end);
    fd.append("multiplier", multiplier);

    return fd;
}