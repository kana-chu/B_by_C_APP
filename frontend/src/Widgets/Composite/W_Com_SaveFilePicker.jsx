/**
 * @component W_Com_SaveFilePicker
 * @folder Widgets/Composite
 * @category Composite
 * @description
 *   Electron の「名前を付けて保存ダイアログ」を使用して
 *   保存ファイルの絶対パスを取得するコンポーネント。
 *   既存ファイルと同名の場合は警告を表示する。
 *
 * @usage
 * ```jsx
 * <W_Com_SaveFilePicker
 *    label="保存データファイル選択"
 *    value={savePath}
 *    onChange={setSavePath}
 *    defaultName="scaled.dat"
 * />
 * ```
 *
 * @remarks
 *   - dialog.showSaveDialog() によりユーザーがファイル名を入力する
 *   - preload.cjs に saveDialog() と checkExists() が必要
 *
 * @export default
 */

import { useState } from "react";
import { W_In_TextInput, W_In_Button } from "../Inputs";
import { W_Dis_Label } from "../Display";

export default function W_Com_SaveFilePicker({
    label = "保存ファイル",
    value = "",
    onChange,
    defaultName = "untitled.dat",
}) {

    const [warning, setWarning] = useState("");

    const checkExists = async (path) => {
        if (!window.electronAPI?.checkExists) return false;
        const res = await window.electronAPI.checkExists(path);
        return res.exists;
    };

    const handleSelect = async () => {
        if (!window.electronAPI?.saveDialog) {
            console.error("Electron saveDialog がありません（preload.cjs を確認）");
            return;
        }

        // ▼ 保存ダイアログを開く（ユーザーがファイル名を入力）
        const selectedPath = await window.electronAPI.saveDialog(defaultName);
        if (!selectedPath) return;

        // ▼ 上書きチェック
        const exists = await checkExists(selectedPath);
        if (exists) {
            setWarning(`  空ファイルを作成しました`);
        } else {
            setWarning("  空ファイルを作成しました");
        }

        onChange(selectedPath);
    };

    return (
        <div className="flex flex-col gap-1 w-full">
            <W_Dis_Label text={label} />

            <div className="flex items-center gap-2 w-full">
                <W_In_TextInput
                    value={value}
                    readOnly
                    className="flex-1 bg-gray-100 shadow-inner text-xs"
                />
                <W_In_Button label="選択" onClick={handleSelect} />
            </div>

            {warning && (
                <div className="text-red-600 text-xs">{warning}</div>
            )}
        </div>
    );
}