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

export function F_Api_Form_CreateMesh({
    left_up,
    right_down,
    ex_meshSize,
    save_path,
}) {
    const fd = new FormData();

    fd.append("left_up", left_up);
    fd.append("right_down", right_down);
    fd.append("ex_meshSize", ex_meshSize);
    fd.append("save_path", save_path);

    return fd;
}