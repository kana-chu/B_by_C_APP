/**
 * @component F_Api_CreateMesh
 * @folder Modules/Api/CreateMesh
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

import { apiPost } from "../Feature_Api_Client";
import { isDev } from "@/env/runtime";

export async function F_Api_CreateMesh(params) {
    // ----------------------------
    // request payload 構築
    // ----------------------------
    const payload = {
        left_up: params.leftUp,
        right_down: params.rightDown,
        ex_meshSize: params.exMeshSize,
        save_path: params.savePath,
    };

    // ----------------------------
    // DEBUG LOG（送信前）
    // ----------------------------
    if (isDev) {
        console.groupCollapsed("[F_Api_CreateMesh] REQUEST");
        console.log("endpoint:", "/meshsheet/create-mesh");
        console.log("payload:", payload);

        // トラップ防止ログ
        console.log("type checks:", {
            left_up: typeof payload.left_up,
            right_down: typeof payload.right_down,
            ex_meshSize: typeof payload.ex_meshSize,
            save_path: typeof payload.save_path,
        });
        console.groupEnd();
    }

    // ----------------------------
    // API CALL
    // ----------------------------
    try {
        const result = await apiPost(
            "http://localhost:8000/meshsheet/create-mesh",
            payload
        );

        // ----------------------------
        // DEBUG LOG（成功時）
        // ----------------------------
        if (isDev) {
            console.groupCollapsed("[F_Api_CreateMesh] RESPONSE");
            console.log("result:", result);
            console.groupEnd();
        }

        return result;

    } catch (error) {
        // ----------------------------
        // DEBUG LOG（失敗時）
        // ----------------------------
        if (isDev) {
            console.group("[F_Api_CreateMesh] ERROR");
            console.error(error);
            console.groupEnd();
        }

        throw error;
    }
}