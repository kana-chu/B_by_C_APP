/**
 * @component W_C_FileOrFolderPicker
 * @folder Widgets/Composite
 * @category Composite
 * @description
 *   ファイル / フォルダ選択 + パス表示 の複合コンポーネント。
 *   Widgets/Inputs のウィジェットを組み合わせて構成。
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
 *   - input[type=file] は hidden にして完全に非表示化
 *   - 表示用 TextInput は横幅いっぱいに伸びる
 *
 * @export default
 */

import { useRef } from "react";
import {
    W_In_TextInput,
    W_In_Button
} from "../Inputs";

import {
    W_Dis_Label,
} from "../Display";

export default function W_C_FileOrFolderPicker({
    label = "パス選択",
    value = "",
    onChange,
    mode = "file",      // "file" | "folder"
    accept = "",
}) {
    const inputRef = useRef(null);

    return (
        <div className="flex flex-col gap-1 w-full">

            {/* ラベル */}
            <W_Dis_Label text={label} />

            <div className="flex items-center gap-2 w-full">

                {/* ★ パス表示（横幅いっぱい） */}
                <W_In_TextInput
                    value={value}
                    readOnly
                    className="flex-1 bg-gray-100 shadow-inner"
                />

                {/* 選択ボタン */}
                <W_In_Button
                    label="選択"
                    onClick={() => inputRef.current?.click()}
                />

                {/* ★ 完全非表示の input[type=file] */}
                <input
                    type="file"
                    ref={inputRef}
                    onChange={(e) => {
                        const f = e.target.files?.[0];
                        onChange(f?.name ?? "");
                    }}
                    accept={accept}
                    {...(mode === "folder"
                        ? { webkitdirectory: "true", directory: "true" }
                        : {})}
                    className="hidden"
                />
            </div>
        </div>
    );
}