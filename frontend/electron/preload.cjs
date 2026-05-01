/**
 * @component ElectronPreload (FINAL)
 * @folder electron
 * @category Electron
 * @description
 *   Renderer（React）から Electron IPC を安全に利用するための橋渡し。
 *   - File / Folder dialog
 *   - Save dialog
 *   - File exists check
 *   - electron-ready 通知
 */

const { contextBridge, ipcRenderer } = require("electron");

/* =====================================================
 * Renderer に公開する API
 * ===================================================== */
contextBridge.exposeInMainWorld("electronAPI", {
    /* -----------------------------
        ファイル選択（既存）
        - mode = "file" | "folder"
    ----------------------------- */
    selectFile: (mode = "file") => {
        return ipcRenderer.invoke("select-file", mode);
    },

    /* -----------------------------
        ✅ フォルダ選択（CSV 高速モード用・新規）
        - フォルダパスのみ返す
    ----------------------------- */
    selectFolder: () => {
        return ipcRenderer.invoke("select-folder");
    },

    /* -----------------------------
        保存ダイアログ（既存・Excel 用）
    ----------------------------- */
    saveDialog: (defaultName) => {
        return ipcRenderer.invoke("save-dialog", defaultName);
    },

    /* -----------------------------
        ファイル存在チェック
    ----------------------------- */
    checkExists: (path) => {
        return ipcRenderer.invoke("check-exists", path);
    },

    /* -----------------------------
        Electron ready 通知
    ----------------------------- */
    onReady: (callback) => {
        if (typeof callback !== "function") return;

        const handler = () => callback();
        ipcRenderer.once("electron-ready", handler);
    },
});