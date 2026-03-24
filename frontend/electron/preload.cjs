/**
 * @component ElectronPreload
 * @folder electron
 * @category Electron
 * @description
 *   Render（React）側から Electron の IPC を安全に使えるようにする。
 *   selectFile(mode) をフロントへ公開する。
 *
 * @export
 */

const { contextBridge, ipcRenderer } = require("electron");

// Renderer → Main 通信
contextBridge.exposeInMainWorld("electronAPI", {
    selectFile: (mode = "file") => ipcRenderer.invoke("select-file", mode),
    saveDialog: (defaultName) => ipcRenderer.invoke("save-dialog", defaultName),
    checkExists: (path) => ipcRenderer.invoke("check-exists", path),
    onReady: (callback) => ipcRenderer.on("electron-ready", callback),
});
