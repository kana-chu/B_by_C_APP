/**
 * @component W_I_FileOrFolderPicker
 * @folder Widgets/Inputs
 * @category Inputs
 * @description
 *   ファイルまたはフォルダ選択用の基本ウィジェット。
 *   - folder=true でフォルダ選択
 *   - accept=".csv,.txt" のように拡張子制限可能
 *   - hidden フラグで非表示化（Composite側利用）
 *
 * @usage
 * ```jsx
 * <W_I_FileOrFolderPicker folder onChange={handleFile} accept=".csv" />
 * ```
 *
 * @export default
 */

import { useRef } from "react";

export default function W_In_FileOrFolderPicker({
    label,
    onChange,
    folder = false,
    accept = "",
}) {
    const ref = useRef(null);

    return (
        <div className="flex flex-col gap-1">
            <label className="font-medium">{label}</label>

            <input
                ref={ref}
                type="file"
                onChange={onChange}
                className="border p-2 rounded-md shadow-sm"
                accept={!folder ? accept : undefined}
                {...(folder ? { webkitdirectory: "true" } : {})}
            />
        </div>
    );
}