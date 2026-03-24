/**
 * @component Mod_Api_Client
 * @folder Modules/Api
 * @category Core
 * @description
 *   全ての API 通信用の共通クライアント。
 *   通信方式（fetch / axios）を統一し、エラーハンドリングも一元化する。
 *
 * @usage
 *   const data = await apiPost("/dat/change-scale", formData);
 *
 * @export
 */

export async function apiPost(url, body, options = {}) {
    const response = await fetch(url, {
        method: "POST",
        body,
        ...options
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
}