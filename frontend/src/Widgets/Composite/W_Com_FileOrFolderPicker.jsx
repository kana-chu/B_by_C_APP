/**
 * @component W_C_FileOrFolderPicker
 * @folder Widgets/Composite
 * @category Composite
 * @description
 *   Electron 専用のファイル/フォルダ選択コンポーネント。
 *   「選択」ボタンを押すと Electron のダイアログが開き、
 *   絶対パスを取得して表示し、親コンポーネントへ返す。
 *
 * @usage
 * ```
 * <W_C_FileOrFolderPicker
 *    label="元データファイル選択"
 *    mode="file"
 *    value={path}
 *    onChange={(absPath) => setPath(absPath)}
 * />
 * ```
 *
 * @remarks
 *   - Electron の preload.js で window.electronAPI.selectFile() を提供しておく必要がある
 *   - ブラウザの input[type=file] は一切使わない
 *   - 表示テキストは読み取り専用
 *
 * @export default
 */

import {
    W_In_TextInput,
    W_In_Button
} from "../Inputs";

import {
    W_Dis_Label,
} from "../Display";

export default function W_Com_FileOrFolderPicker({
    label = "パス選択",
    value = "",
    onChange,
    mode = "file", // 将来的に folder モードにも対応可
}) {

    /** ▼ Electron ダイアログを開いて絶対パスを取得する */
    const handleClickSelect = async () => {
        if (!window.electronAPI || !window.electronAPI.selectFile) {
            console.error("Electron API が読み込まれていません。preload.js を確認してください");
            return;
        }

        const selectedPath = await window.electronAPI.selectFile(mode);
        if (selectedPath) {
            onChange(selectedPath); // 親に絶対パスを返す
        }
    };

    return (
        <div className="flex flex-col gap-1 w-full">

            {/* ▼ ラベル */}
            <W_Dis_Label text={label} />

            <div className="flex items-center gap-2 w-full">

                {/* ▼ 絶対パス表示 */}
                <W_In_TextInput
                    value={value}
                    readOnly
                    className="flex-1 bg-gray-100 shadow-inner text-xs"
                />

                {/* ▼ 選択ボタン → Electron ダイアログ */}
                <W_In_Button
                    label="選択"
                    onClick={handleClickSelect}
                />

            </div>
        </div>
    );
}
``