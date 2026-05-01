/**
 * Electron Main Process
 * FINAL REAL COMPLETED VERSION (Windows + PyInstaller safe)
 */

const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const { spawn, execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const http = require("http");

let mainWindow = null;
let backendProcess = null;

/**
 * アプリ状態
 * starting → running → quitting
 */
let appState = "starting";

/* =====================================================
 * Single Instance Lock（必須）
 * ===================================================== */
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
    app.quit();
    return;
}

app.on("second-instance", () => {
    if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
    }
});

/* =====================================================
 * DEV / PROD 判定
 * ===================================================== */
const DEBUG = !app.isPackaged;

/* =====================================================
 * DEV：残留 backend.exe を全 kill
 * ===================================================== */
function killStaleBackendExe() {
    try {
        const output = execSync(
            'tasklist | findstr /I "backend.exe"',
            { stdio: "pipe" }
        ).toString();

        if (output.trim()) {
            execSync('taskkill /IM backend.exe /T /F');
        }
    } catch {
        // none
    }
}

/* =====================================================
 * backend.exe path
 * ===================================================== */
function getBackendPath() {
    if (app.isPackaged) {
        return path.join(
            process.resourcesPath,
            "app.asar.unpacked",
            "electron",
            "backend",
            "backend",
            "backend.exe"
        );
    }
    return path.join(__dirname, "backend", "backend", "backend.exe");
}

/* =====================================================
 * backend 完全 kill（プロセスツリー）
 * ===================================================== */
function killBackendTree() {
    if (!backendProcess || !backendProcess.pid) return;

    try {
        execSync(`taskkill /PID ${backendProcess.pid} /T /F`);
    } catch {
        // already dead
    }
    backendProcess = null;
}

/* =====================================================
 * backend launch（starting のみ）
 * ===================================================== */
function startBackend() {
    if (appState !== "starting") return;
    if (backendProcess) return;

    const backendPath = getBackendPath();
    if (!fs.existsSync(backendPath)) {
        dialog.showErrorBox("Backend Error", backendPath);
        app.quit();
        return;
    }

    backendProcess = spawn(backendPath, [], {
        windowsHide: true,
        stdio: "ignore",
    });
}

/* =====================================================
 * backend 起動待ち（HTTP）
 * ===================================================== */
function waitForBackendHttp(
    url = "http://127.0.0.1:8000/",
    timeoutMs = 60000
) {
    const start = Date.now();

    return new Promise((resolve, reject) => {
        const check = () => {
            http.get(url, res => {
                if (res.statusCode === 200) {
                    resolve();
                } else {
                    retry();
                }
            }).on("error", retry);

            function retry() {
                if (Date.now() - start > timeoutMs) {
                    reject(new Error("backend startup timeout"));
                } else {
                    setTimeout(check, 500);
                }
            }
        };
        check();
    });
}

/* =====================================================
 * main window
 * ===================================================== */
async function createWindow() {
    if (!DEBUG) {
        startBackend();
        try {
            await waitForBackendHttp();
            appState = "running";
        } catch {
            dialog.showErrorBox("Error", "Backend failed to start");
            app.quit();
            return;
        }
    } else {
        appState = "running";
    }

    mainWindow = new BrowserWindow({
        width: 1050,
        height: 930,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
            contextIsolation: true,
            nodeIntegration: false,
            devTools: DEBUG,
        },
    });

    if (DEBUG) {
        mainWindow.loadURL("http://localhost:5173");
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), "dist", "index.html"));
    }

    /**
     * ✅ 元の仕様：Renderer ready 通知（Loading解除）
     */
    mainWindow.webContents.on("did-finish-load", () => {
        mainWindow.webContents.send("electron-ready");
        if (DEBUG) {
            mainWindow.webContents.openDevTools({ mode: "detach" });
        }
    });

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

/* =====================================================
 * IPC handlers
 * ===================================================== */
ipcMain.handle("select-file", async (_, mode = "file") => {
    const result = await dialog.showOpenDialog({
        properties: mode === "folder" ? ["openDirectory"] : ["openFile"],
    });
    return result.canceled ? null : result.filePaths[0];
});

ipcMain.handle("save-dialog", async (_, defaultName) => {
    const { filePath, canceled } = await dialog.showSaveDialog({
        defaultPath: defaultName,
    });
    if (canceled || !filePath) return null;
    return filePath;
});

ipcMain.handle("select-folder", async () => {
    const result = await dialog.showOpenDialog({
        properties: ["openDirectory"],
    });

    if (result.canceled || result.filePaths.length === 0) {
        return null;
    }

    return result.filePaths[0];
});


ipcMain.handle("check-exists", async (event, path) => {
    try {
        return {
            exists: fs.existsSync(path),
        };
    } catch (e) {
        return {
            exists: false,
        };
    }
});


/* =====================================================
 * lifecycle（完全終了保証）
 * ===================================================== */
app.on("before-quit", () => {
    appState = "quitting";
});

app.on("window-all-closed", () => {
    appState = "quitting";
    killBackendTree();
    if (process.platform !== "darwin") app.quit();
});

app.on("quit", () => {
    killBackendTree();
});

app.whenReady().then(() => {
    if (DEBUG) {
        killStaleBackendExe();
    }
    createWindow();
});