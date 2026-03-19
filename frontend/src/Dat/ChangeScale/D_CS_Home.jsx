/**
 * @component D_CS_Home
 * @folder Dat/ChangeScale
 * @category Page
 * @description
 *   Change Scale（dat計算）のメイン画面。
 *   既存の Widgets / Composite / FeedBack / WidgetsForApp を組み合わせた画面レイアウト。
 *
 * @export default
 */

import { useState } from "react";

// 共通レイアウト
import L_Layout from "../../Layout/L_Layout";

// ----- Composite（Label + Input） -----
import {
	W_Com_LabelSelectBox,
	W_Com_LabelDateInput,
	W_Com_LabelTextInput,
	W_Com_LabelButton,
} from "../../Widgets/Composite";

// ----- Inputs -----
import {
	W_In_Button,
	W_In_FileOrFolderPicker
} from "../../Widgets/Inputs";

// ----- FeedBack -----
import {
	W_Feed_Pro_Bar
} from "../../Widgets/FeedBack/Progress";

import {
	W_Feed_Mess_Message
} from "../../Widgets/FeedBack/Message";

// ----- ForDat（Time Info） -----
import {
	WFA_D_Fb_TimeInfoBox
} from "../../WidgetsForApp/ForDat/Feedback";

export default function D_CS_Home() {

	// -----------------------------
	// 状態管理（必要に応じて追加）
	// -----------------------------
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const [calcStart, setCalcStart] = useState("");
	const [calcEnd, setCalcEnd] = useState("");

	const [multiplier, setMultiplier] = useState("");

	const [path, setPath] = useState("");
	const [progress, setProgress] = useState(0);
	const [message, setMessage] = useState("正常に完了しました。");

	const [totalSeconds, setTotalSeconds] = useState(0);

	return (
		<L_Layout title="datファイル等倍計算">
			<div className="flex flex-col gap-6 w-full">

				{/* ------------------------- */}
				{/* 元データ選択エリア */}
				{/* ------------------------- */}
				<W_Com_LabelSelectBox
					label="元データ選択"
					value={path}
					onChange={setPath}
					options={[]}                  // 直接入力でも OK
					onOpenDialog={() => { }}       // 別ウインドウ選択
				/>

				{/* ファイル選択 */}
				<W_In_FileOrFolderPicker
					label="ファイル選択"
					onChange={(e) => {
						const f = e.target.files[0];
						setPath(f?.name ?? "");
					}}
				/>

				{/* ------------------------- */}
				{/* 選択したデータの範囲 */}
				{/* ------------------------- */}
				<div className="flex items-center gap-4">
					<W_Com_LabelDateInput
						label="選択したデータの範囲（開始）"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
					/>
					<span>〜</span>
					<W_Com_LabelDateInput
						label="（終了）"
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
					/>
				</div>

				{/* 決定ボタン */}
				<W_In_Button label="決定" onClick={() => console.log("決定")} />

				{/* ------------------------- */}
				{/* 秒数一覧表示 */}
				{/* ------------------------- */}
				<WFA_D_Fb_TimeInfoBox
					header="ヘッダー記載の秒数一覧表示"
					seconds={totalSeconds}
				/>

				{/* ------------------------- */}
				{/* 計算設定 */}
				{/* ------------------------- */}
				<W_Com_LabelSelectBox
					label="本計算開始時間"
					value={calcStart}
					onChange={setCalcStart}
					options={["00:00", "00:30", "01:00", "01:30"]}
					onOpenDialog={() => { }}
				/>

				<W_Com_LabelSelectBox
					label="本計算終了時間"
					value={calcEnd}
					onChange={setCalcEnd}
					options={["00:00", "00:30", "01:00", "01:30"]}
					onOpenDialog={() => { }}
				/>

				<W_Com_LabelTextInput
					label="計算倍率"
					value={multiplier}
					onChange={setMultiplier}
					type="float"
					unit="倍"
					maxLength={6}
				/>

				{/* 保存ボタン */}
				<W_In_Button
					label="保存"
					onClick={() => console.log("保存")}
				/>

				{/* ------------------------- */}
				{/* Progress */}
				{/* ------------------------- */}
				<W_Feed_Pro_Bar
					label="progress"
					value={progress}
				/>

				{/* ------------------------- */}
				{/* message */}
				{/* ------------------------- */}
				<W_Feed_Mess_Message
					text={message}
				/>

			</div>
		</L_Layout>
	);
}