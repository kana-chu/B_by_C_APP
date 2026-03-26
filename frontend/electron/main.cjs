/**
 * @component ElectronMain
 * @folder electron
 * @category Electron
 * @description
 *   React（フロントエンド）と連携する Electron メインプロセス。
 *   スプラッシュ画面表示、Vite の読み込み管理、プリロードスクリプト登録、
 *   ファイル/フォルダ選択、保存ダイアログ（上書き確認は Windows に任せる）、
 *   ファイル存在チェックなどを提供する。
 *
 * @usage
 *   // frontend/package.json 内の scripts:
 *   {
 *     "electron": "electron ../electron/main.cjs",
 *     "dev:app": "concurrently \"npm run dev\" \"npm run electron\""
 *   }
 *
 *   // React 側での呼び出し例
 *   const path = await window.electronAPI.selectFile("file");
 *   const savePath = await window.electronAPI.saveDialog("output.dat");
 *   const exists = await window.electronAPI.checkExists(path);
 *
 * @remarks
 *   - Windows の showSaveDialog は同名ファイルが選択された場合、
 *     OS のネイティブ上書き確認ダイアログを **自動で1回だけ** 表示するため、
 *     Electron 側での重複上書き確認は不要（実装しない）。
 *   - 保存時は空ファイルを自動生成して React 側へ絶対パスを返す。
 *
 * @export
 */

const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");

let splash;
let mainWindow;

// ==========================================
// ▼ メインウィンドウ + スプラッシュ画面生成
// ==========================================
function createWindow() {

    // ▼ スプラッシュ画面
    splash = new BrowserWindow({
        width: 360,
        height: 260,
        frame: false,
        alwaysOnTop: true,
        resizable: false,
    });
    splash.loadFile(path.join(__dirname, "splash.html"));

    // ▼ React(main) ウィンドウ
    mainWindow = new BrowserWindow({
        width: 1050,
        height: 910,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
        },
    });

    // Vite を読み込み
    mainWindow.loadURL("http://localhost:5173");

    // 完了時 → スプラッシュ閉じてメイン表示
    mainWindow.webContents.on("did-finish-load", () => {
        mainWindow.show();
        if (splash) splash.close();
        mainWindow.webContents.send("electron-ready");
    });
}

// ==========================================
// ▼ ファイル/フォルダ選択（UTF‑8(BOM無し)以外はすべてエラー）
// ==========================================
ipcMain.handle("select-file", async (event, mode = "file") => {

    const result = await dialog.showOpenDialog({
        properties: mode === "folder" ? ["openDirectory"] : ["openFile"],
    });

    if (result.canceled) return null;

    const selectedPath = result.filePaths[0];

    // ▼ フォルダ選択はそのまま返す
    if (mode === "folder") return selectedPath;

    try {
        const data = fs.readFileSync(selectedPath);

        // ▼ BOM チェック（UTF‑8 BOM = EF BB BF）
        const hasBOM =
            data.length >= 3 &&
            data[0] === 0xEF &&
            data[1] === 0xBB &&
            data[2] === 0xBF;

        if (hasBOM) {
            await dialog.showMessageBox({
                type: "error",
                title: "文字コードエラー（BOM付き）",
                message:
                    `このファイルは UTF-8(BOM付き) です。\n\n` +
                    `UTF-8(BOMなし) のファイルを選択してください。\n\n` +
                    `ファイル: ${selectedPath}`,
                buttons: ["OK"],
            });
            return null;
        }

        // ▼ UTF‑8 の妥当性チェック（BOMなし）
        const decoder = new TextDecoder("utf-8", { fatal: true });
        try {
            decoder.decode(data);
        } catch (decodeErr) {
            await dialog.showMessageBox({
                type: "error",
                title: "文字コードエラー",
                message:
                    `このファイルは UTF‑8(BOMなし) ではありません。\n\n` +
                    `Shift-JIS / EUC-JP などは使用できません。\n\n` +
                    `ファイル: ${selectedPath}`,
                buttons: ["OK"],
            });
            return null;
        }

        // ▼ ここまで来たら UTF‑8(BOMなし) のみ
        return selectedPath;

    } catch (err) {
        console.error("select-file 読み込みエラー:", err);
        await dialog.showMessageBox({
            type: "error",
            title: "読み込みエラー",
            message: `ファイルを読み込めませんでした。\n${selectedPath}`,
            buttons: ["OK"],
        });
        return null;
    }
});

// ==========================================
// ▼ 保存ダイアログ（上書き確認は Windows に任せる）
//    → 選択された時点で空ファイル作成
// ==========================================
ipcMain.handle("save-dialog", async (event, defaultName = "output.dat") => {

    const { filePath, canceled } = await dialog.showSaveDialog({
        title: "保存ファイル名を指定",
        defaultPath: defaultName,
        filters: [
            { name: "DAT Files", extensions: ["dat", "txt"] },
            { name: "All Files", extensions: ["*"] },
        ]
    });

    if (canceled || !filePath) return null;

    try {
        // 親フォルダ作成
        const parent = path.dirname(filePath);
        fs.mkdirSync(parent, { recursive: true });

        // OS側で上書き警告が出た後の結果なので
        // 空ファイルを作成（新規 or 上書き）
        fs.writeFileSync(filePath, "");

        return filePath;

    } catch (err) {
        console.error("保存ファイル作成エラー:", err);
        return null;
    }
});

// ==========================================
// ▼ ファイル存在チェック
// ==========================================
ipcMain.handle("check-exists", async (event, targetPath) => {
    return { exists: fs.existsSync(targetPath) };
});

// ==========================================
// ▼ Electron アプリ起動
// ==========================================
app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});