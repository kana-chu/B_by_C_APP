/**
 * @component W_Com_SaveFilePicker
 * @folder Widgets/Composite
 * @category Composite
 * @description
 *   Electron の「名前を付けて保存ダイアログ」を使用して
 *   保存ファイルの絶対パスを取得するコンポーネント。
 *   既存ファイルと同名の場合は警告を表示する。
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
            console.error("Electron saveDialog がありません");
            return;
        }

        const selectedPath = await window.electronAPI.saveDialog(defaultName);
        if (!selectedPath) return;

        const exists = await checkExists(selectedPath);

        // ※ 選択時点ではファイル内容は書き換わらない
        setWarning(
            exists
                ? "既存ファイルが選択されています（計算実行時に上書きされます）"
                : "新しい保存ファイルが選択されています"
        );

        // 同一パス再選択でも再描画させる
        onChange("");
        setTimeout(() => {
            onChange(selectedPath);
        }, 0);
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

            {/* ▼ 警告表示エリア（高さは常に確保） */}
            <div className="min-h-[1.0rem]">
                {warning && (
                    <div
                        className="
                            text-xs
                            font-normal
                            text-[var(--ui-text)]
                        "
                    >
                        {warning}
                    </div>
                )}
            </div>
        </div>
    );
}