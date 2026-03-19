/**
 * @component W_C_FileOrFolderPicker
 * @folder Widgets/Composite
 * @category Composite
 * @description
 * ファイル / フォルダ選択 + パス表示 の複合コンポーネント。
 * Widgets/Inputs のウィジェットを組み合わせて構成。
 *
 * @usage
 * ```jsx
 * <W_C_FileOrFolderPicker
 *    label="ファイル選択"
 *    mode="file"
 *    accept=".csv,.txt"
 *    value={path}
 *    onChange={handlePath}
 * />
 * ```
 *
 * @remarks
 * README 自動生成ツール対応。
 *
 * @export default
 */

import { useRef } from "react";
import {
    W_I_Label,
    W_I_TextInput,
    W_I_Button,
    W_I_FileOrFolderPicker,
} from "../Inputs";

export default function W_C_FileOrFolderPicker({
    label = "パス選択",
    value = "",
    onChange,
    mode = "file",      // "file" or "folder"
    accept = "",        // ".csv,.txt" など（mode=file の時のみ）
}) {
    const inputRef = useRef(null);

    return (
        <div className="flex flex-col gap-1 w-full">
            {/* ラベル */}
            <W_I_Label text={label} />

            <div className="flex items-center gap-2 w-full">

                {/* パス表示 （読み取り専用） */}
                <W_I_TextInput
                    value={value}
                    readOnly
                    className="flex-1 bg-gray-100 shadow-inner"
                />

                {/* 選択ボタン */}
                <W_I_Button
                    label="選択"
                    onClick={() => inputRef.current?.click()}
                />

                {/* 実際の hidden input（file/folder） */}
                <W_I_FileOrFolderPicker
                    refObj={inputRef}
                    onChange={onChange}
                    folder={mode === "folder"}
                    accept={accept}
                    hidden={true}
                />
            </div>
        </div>
    );
}
