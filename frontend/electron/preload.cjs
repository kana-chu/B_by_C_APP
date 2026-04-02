/**
 * @component ElectronPreload (FINAL)
 * @folder electron
 * @category Electron
 * @description
 *   Renderer（React）から Electron IPC を安全に利用するための橋渡し。
 *   - File / Save dialog
 *   - File exists check
 *   - electron-ready 通知
 */

const { contextBridge, ipcRenderer } = require("electron");

/* =====================================================
 * Renderer に公開する API
 * ===================================================== */
contextBridge.exposeInMainWorld("electronAPI", {
    /* -----------------------------
        ファイル/フォルダ選択
    ----------------------------- */
    selectFile: (mode = "file") => {
        return ipcRenderer.invoke("select-file", mode);
    },

    /* -----------------------------
        保存ダイアログ
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
        - main.cjs から send("electron-ready")
        - React 側で onReady(callback)
    ----------------------------- */
    onReady: (callback) => {
        if (typeof callback !== "function") return;

        // 1回だけ発火させたい場合は once
        const handler = () => callback();
        ipcRenderer.once("electron-ready", handler);
    },
});