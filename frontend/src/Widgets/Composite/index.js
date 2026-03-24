/**
 * @file Widgets/Composite/index.js
 * @folder Widgets/Composite
 * @category Widgets
 * @description
 *   Composite（複合ウィジェット）のエクスポート集約ファイル。
 *   Label + SelectBox / Label + TextInput / Label + DateInput / Label + Button
 *   Label + Checkbox / Label + RadioGroup などをここから読み込む。
 *
 * @usage
 * ```jsx
 * // 例：Composite のインポート例
 * import {
 *   W_Com_LabelSelectBox,
 *   W_Com_LabelTextInput,
 *   W_Com_LabelDateInput,
 *   W_Com_LabelButton,
 *   W_Com_LabelCheckbox,
 *   W_Com_LabelRadioGroup
 * } from "../Widgets/Composite";
 *
 * // JSX 内での利用例
 * <W_Com_LabelTextInput
 *    label="計算倍率"
 *    value={value}
 *    onChange={setValue}
 * />
 *
 * <W_Com_LabelSelectBox
 *    label="開始時間"
 *    options={["00:00", "00:30"]}
 *    value={time}
 *    onChange={setTime}
 * />
 * ```
 *
 * @remarks
 *   - Composite は “複数の Widgets（Inputs / Display）を組み合わせた UI”。
 *   - アプリ固有ロジックを含めない汎用コンポーネントのみここに置く。
 *
 * @export
 */

export { default as W_Com_LabelSelectBox } from "./W_Com_LabelSelectBox";
export { default as W_Com_LabelTextInput } from "./W_Com_LabelTextInput";
export { default as W_Com_LabelDateInput } from "./W_Com_LabelDateInput";
export { default as W_Com_LabelButton } from "./W_Com_LabelButton";
export { default as W_Com_LabelCheckbox } from "./W_Com_LabelCheckbox";
export { default as W_Com_LabelRadioGroup } from "./W_Com_LabelRadioGroup";
export { default as W_Com_LabelToggle } from "./W_Com_LabelToggle";
export { default as W_Com_FileOrFolderPicker} from "./W_Com_FileOrFolderPicker";
