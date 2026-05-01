/**
 * @component W_Com_SaveFolderPicker
 * @folder Widgets/Composite
 * @category Composite
 * @description
 *   Electron の「フォルダ選択ダイアログ」を使用して
 *   出力先フォルダの絶対パスを取得するコンポーネント。
 *   CSV 高速モード向け。
 */

import { useEffect, useState } from "react";
import { W_In_TextInput, W_In_Button } from "../Inputs";
import { W_Dis_Label } from "../Display";

export default function W_Com_SaveFolderPicker({
    label = "出力先フォルダ",
    value = "",
    onChange,
    saved = false,      // 保存完了フラグ（CSV生成完了）
}) {
    const [message, setMessage] = useState("");

    // ==================================================
    // 保存完了状態
    // ==================================================
    useEffect(() => {
        if (saved && value) {
            setMessage("CSV ファイルの出力が完了しました");
        }
    }, [saved, value]);

    // ==================================================
    // フォルダ選択
    // ==================================================
    const handleSelect = async () => {
        if (!window.electronAPI?.selectFolder) {
            console.error("Electron selectFolder がありません");
            return;
        }

        const selectedDir = await window.electronAPI.selectFolder();
        if (!selectedDir) return;

        setMessage("出力先フォルダが選択されています");

        // 同一パス再選択でも onChange を発火させる
        onChange(selectedDir);
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

            {/* ▼ メッセージ表示エリア（常に高さ確保） */}
            <div className="min-h-[1.0rem]">
                {message && (
                    <div
                        className="
                            text-xs
                            font-normal
                            text-[var(--ui-text)]
                        "
                    >
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}