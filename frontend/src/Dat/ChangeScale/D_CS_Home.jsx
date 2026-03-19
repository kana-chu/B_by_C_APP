/**
 * @component D_CS_Home
 * @folder Dat/ChangeScale
 * @category Page
 */

import { useState } from "react";
import L_Layout from "../../Layout/L_Layout";

// Composite（Label + Input）
import {
	W_Com_LabelSelectBox,
	W_Com_LabelDateInput,
	W_Com_LabelTextInput,
	W_Com_FileOrFolderPicker
} from "../../Widgets/Composite";

import {
	W_In_Button
} from "../../Widgets/Inputs";

// FeedBack
import { W_Feed_Pro_Bar } from "../../Widgets/FeedBack/Progress";
import { W_Feed_Mess_Message } from "../../Widgets/FeedBack/Message";

// ForDat Table
import { WFA_D_Fb_TimeInfoBox } from "../../WidgetsForApp/ForDat/Feedback";

export default function D_CS_Home() {
	const [path, setPath] = useState("");
	const [savePath, setSavePath] = useState("");
	const [secondsList, setSecondsList] = useState([]);

	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const [calcStart, setCalcStart] = useState("");
	const [calcEnd, setCalcEnd] = useState("");
	const [multiplier, setMultiplier] = useState("");

	const [progress, setProgress] = useState(0);
	const [message, setMessage] = useState("正常に完了しました");

	return (
		<L_Layout title="datファイル等倍計算">

			<div className="flex flex-col gap-8 w-full">

				{/* ▼ 元データファイル選択 */}
				<W_Com_FileOrFolderPicker
					label="元データファイル選択"
					value={path}
					onChange={(v) => setPath(v)}
					mode="file"
					accept=".dat,.txt"
				/>

				{/* ▼ 保存先ファイル選択 */}
				<W_Com_FileOrFolderPicker
					label="保存データファイル選択"
					value={savePath}
					onChange={(v) => setSavePath(v)}
					mode="file"
				/>

				{/* ▼ 日付範囲 */}
				<div className="flex items-center gap-4">
					<W_Com_LabelDateInput
						label="データ範囲（開始）"
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

				{/* ▼ 秒数一覧 ＋ 右側設定カラム */}
				<div className="grid grid-cols-2 gap-8 w-full">

					{/* 左：秒数一覧テーブル */}
					<WFA_D_Fb_TimeInfoBox
						header="ヘッダー記載の秒数一覧表示"
						secondsList={secondsList}
					/>

					{/* 右：計算設定 */}
					<div className="flex flex-col gap-6">

						<W_Com_LabelSelectBox
							label="本計算開始時間"
							value={calcStart}
							onChange={setCalcStart}
							options={["00:00", "01:00", "02:00"]}
						/>

						<W_Com_LabelSelectBox
							label="本計算終了時間"
							value={calcEnd}
							onChange={setCalcEnd}
							options={["00:00", "01:00", "02:00"]}
						/>

						<W_Com_LabelTextInput
							label="計算倍率"
							value={multiplier}
							onChange={setMultiplier}
							type="float"
							unit="倍"
							maxLength={6}
						/>

						<W_In_Button
							label="決定"
							onClick={() => console.log("決定")}
						/>

						<W_Feed_Pro_Bar label="progress" value={progress} />

						<W_Feed_Mess_Message text={message} />
					</div>

				</div>

			</div>
		</L_Layout>
	);
}