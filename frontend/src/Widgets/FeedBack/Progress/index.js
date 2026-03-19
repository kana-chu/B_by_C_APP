/**
 * @file Widgets/FeedBack/Progress/index.js
 * @folder Widgets/FeedBack/Progress
 * @category Widgets
 * @description
 *   Progress 系（進捗表示 UI）コンポーネントのエクスポート集約ファイル。
 *   進捗バーなど、時間経過や完了状況を示す UI をまとめて管理する。
 *
 * @usage
 * ```jsx
 * import {
 *   W_Feed_Pro_Bar
 * } from "../Widgets/FeedBack/Progress";
 *
 * <W_Feed_Pro_Bar value={50} label="progress" />
 * ```
 *
 * @remarks
 *   - Progress は「時間 or 作業の進捗」を可視化する UI 群
 *   - Message/Toast/Modal などとはフォルダを分けて管理
 *
 * @export
 */

export { default as W_Feed_Pro_Bar } from "./W_Feed_Pro_Bar";