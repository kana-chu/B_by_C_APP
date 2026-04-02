/**
 * Electron Main Process (FINAL - PRODUCTION)
 */

const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const { spawn } = require("child_process");
const net = require("net");
const path = require("path");
const fs = require("fs");

let mainWindow = null;
let backendProcess = null;

const DEBUG = false;

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
 * backend launch
 * ===================================================== */
function startBackend() {
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
 * backend wait
 * ===================================================== */
function waitForBackend(port = 8000, timeoutMs = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      const socket = new net.Socket();
      socket.once("error", () => {
        socket.destroy();
        if (Date.now() - start > timeoutMs) reject();
        else setTimeout(check, 500);
      });
      socket.connect(port, "127.0.0.1", () => {
        socket.end();
        resolve();
      });
    };
    check();
  });
}

/* =====================================================
 * main window
 * ===================================================== */
async function createWindow() {
  startBackend();
  try {
    await waitForBackend();
  } catch {
    dialog.showErrorBox("Error", "Backend failed to start");
    app.quit();
    return;
  }

  mainWindow = new BrowserWindow({
    width: 1050,
    height: 910,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      devTools: DEBUG,
      webSecurity: true,
    },
  });

  const indexPath = path.join(app.getAppPath(), "dist", "index.html");
  mainWindow.loadFile(indexPath);

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send("electron-ready");
    if (DEBUG) mainWindow.webContents.openDevTools({ mode: "detach" });
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
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, "");
  return filePath;
});

ipcMain.handle("check-exists", async (_, p) => ({
  exists: fs.existsSync(p),
}));

/* =====================================================
 * lifecycle
 * ===================================================== */
app.on("before-quit", () => backendProcess?.kill());
app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});