/**
 * @component W_I_FileOrFolderPicker
 * @folder Widgets/Inputs
 * @category Inputs
 * @description
 *   テーマカラーに準拠したファイル/フォルダ選択ウィジェット。
 *   - ネイティブの file UI を隠し、独自デザインに置換
 *   - ボタン部分はミルクティー（var(--ui-btn)）
 *   - 枠線/背景/文字色すべて UI と統一
 *
 * @export default
 */

import { useRef } from "react";

export default function W_I_FileOrFolderPicker({
    label,
    onChange,
    folder = false,
    accept = "",
}) {
    const ref = useRef(null);

    return (
        <div className="flex flex-col gap-1">
            <label className="font-medium text-[var(--ui-text)]">
                {label}
            </label>

            {/* 親枠で角丸＆枠線統一 */}
            <div
                className="
                    flex items-center gap-2
                    border border-[var(--ui-card-border)]
                    rounded-md shadow-sm bg-[var(--ui-card)]
                    overflow-hidden
                "
            >
                {/* 表示テキスト（選択されたファイル名表示用） */}
                <div className="flex-1 px-2 py-1 text-[var(--ui-text)] truncate">
                    {ref.current?.files?.[0]?.name ?? "選択されていません"}
                </div>

                {/* 擬似ボタン（押す部分をわかりやすく） */}
                <button
                    type="button"
                    onClick={() => ref.current?.click()}
                    className="
                        px-3 py-1
                        bg-[var(--ui-btn)]
                        hover:bg-[var(--ui-btn-hover)]
                        text-[var(--ui-btn-text)]
                        transition
                        h-full
                    "
                >
                    選択
                </button>

                {/* ネイティブの input（非表示） */}
                <input
                    ref={ref}
                    type="file"
                    onChange={onChange}
                    className="hidden"
                    accept={!folder ? accept : undefined}
                    {...(folder ? { webkitdirectory: "true" } : {})}
                />
            </div>
        </div>
    );
}