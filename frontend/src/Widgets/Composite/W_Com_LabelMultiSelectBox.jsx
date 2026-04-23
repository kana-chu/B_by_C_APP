/**
 * @component W_Com_LabelMultiSelectBox
 * @description
 *   SelectBox + 追加ボタン + タグ型 MultiSelect（完成版）
 */

import { useState } from "react";
import { W_Dis_Label } from "../Display";
import { W_In_SelectBox, W_In_Button } from "../Inputs";

export default function W_Com_LabelMultiSelectBox({
    label,
    options = [],        // { label, value }[]
    values = [],         // string[]
    onChange,
    styleWidth = "100%",
    areaHeight = "80px"
}) {
    // ----------------------------
    // 正規化（防御）
    // ----------------------------
    const safeOptions = Array.isArray(options) ? options : [];
    const safeValues = Array.isArray(values) ? values : [];

    // ----------------------------
    // 仮選択中の値（追加前）
    // ----------------------------
    const [pendingValue, setPendingValue] = useState("");

    // ----------------------------
    // 未追加 options
    // ----------------------------
    const selectableOptions = safeOptions.filter(
        opt => !safeValues.includes(opt.value)
    );

    // ----------------------------
    // 追加確定
    // ----------------------------
    const handleAdd = () => {
        if (!pendingValue) return;
        if (safeValues.includes(pendingValue)) return;

        onChange([...safeValues, pendingValue]);
        setPendingValue(""); // ★ 追加後リセット
    };

    // ----------------------------
    // 削除
    // ----------------------------
    const handleRemove = (value) => {
        onChange(safeValues.filter(v => v !== value));
    };

    return (
        <div className="flex flex-col gap-2 w-full">

            {/* ラベル */}
            {label && <W_Dis_Label text={label} />}

            {/* Select + 追加ボタン */}
            <div className="flex items-center gap-2">
                <W_In_SelectBox
                    value={pendingValue}
                    options={selectableOptions}
                    onChange={(e) => setPendingValue(e.target.value)}
                    styleWidth={styleWidth}
                />

                <W_In_Button
                    label="追加"
                    disabled={!pendingValue}
                    onClick={handleAdd}
                />
            </div>

            {/* 選択済み表示エリア（常に表示） */}
            <div
                className="
                    flex flex-wrap gap-2
                    items-center
                    min-h-[36px]
                    p-2
                    rounded-md
                    border border-dashed border-[var(--ui-card-border)]
                "
                style={{
                    height: areaHeight,
                }}
            >
                {safeValues.length === 0 && (
                    <span className="text-xs text-[var(--ui-text-sub)]">
                        選択されていません
                    </span>
                )}

                {safeValues.map((v) => {
                    const opt = safeOptions.find(o => o.value === v);
                    const labelText = opt?.label ?? v;

                    return (
                        <div
                            key={v}
                            className="
                                flex items-center gap-1
                                px-2 py-1
                                rounded-md
                                bg-[var(--ui-table-even)]
                                text-[var(--ui-text)]
                                text-xs
                            "
                        >
                            <span>{labelText}</span>

                            <button
                                type="button"
                                onClick={() => handleRemove(v)}
                                className="
                                    ml-1
                                    text-[var(--ui-text-sub)]
                                    hover:text-[var(--ui-text)]
                                    transition
                                "
                                aria-label="削除"
                            >
                                ×
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}