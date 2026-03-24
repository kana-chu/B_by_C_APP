/**
 * @component D_CS_Home
 * @folder Dat/ChangeScale
 * @category Page
 * @description
 *   dat ファイルの等倍計算画面。
 *   Electron から取得した “絶対パスのファイルパス” を FastAPI に送信する。
 *
 * @export default
 */

import { useState } from "react";
import L_Layout from "../../Layout/L_Layout";

// Composite（Label + Input）
import {
	W_Com_LabelSelectBox,
	W_Com_LabelDateInput,
	W_Com_LabelTextInput,
	W_Com_FileOrFolderPicker,
	W_Com_SaveFilePicker,
} from "../../Widgets/Composite";

import { W_In_Button } from "../../Widgets/Inputs";

// FeedBack
import { W_Feed_Pro_Bar } from "../../Widgets/FeedBack/Progress";
import { W_Feed_Mess_Message } from "../../Widgets/FeedBack/Message";

// ForDat Table
import { WFA_D_Fb_TimeInfoBox } from "../../WidgetsForApp/ForDat/Feedback";

// ▼ API 呼び出し
import { Mod_Api_Dat_ChangeScale } from "../../Modules/Api/Dat/Mod_Api_Dat_ChangeScale";

export default function D_CS_Home() {
	// ▼ 絶対パスで保持
	const [path, setPath] = useState("");
	const [savePath, setSavePath] = useState("");

	const [secondsList, setSecondsList] = useState([]);

	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	const [calcStart, setCalcStart] = useState("");
	const [calcEnd, setCalcEnd] = useState("");
	const [multiplier, setMultiplier] = useState("");

	const [progress, setProgress] = useState(0);
	const [message, setMessage] = useState("準備中…");

	/** ▼ Electron ダイアログから絶対パスを取得する **/
	const handleSelectInputFile = async () => {
		const absolutePath = await window.electronAPI.selectFile();
		if (absolutePath) setPath(absolutePath);
	};

	const handleSelectSaveFile = async () => {
		const absolutePath = await window.electronAPI.selectFile();
		if (absolutePath) setSavePath(absolutePath);
	};

	/** ▼ バックエンド送信 **/
	const handleSubmit = async () => {
		try {
			if (!path) {
				setMessage("データファイルを選択してください");
				return;
			}

			setMessage("送信中…");
			setProgress(30);

			// ▼ API 呼び出し（パスを送信するだけ）
			const data = await Mod_Api_Dat_ChangeScale({
				file_path: path,
				save_path: savePath,
				start_date: startDate,
				end_date: endDate,
				calc_start: calcStart,
				calc_end: calcEnd,
				multiplier: multiplier,
			});

			setProgress(100);
			setMessage(data.message ?? "処理完了");

			if (data.secondsList) {
				setSecondsList(data.secondsList);
			}

		} catch (err) {
			console.error(err);
			setMessage("エラーが発生しました");
		}
	};

	return (
		<L_Layout title="datファイル等倍計算">

			<div className="flex flex-col gap-8 w-full">
				<W_Com_FileOrFolderPicker
					label="元データファイル選択"
					value={path}
					onChange={(absPath) => setPath(absPath)}
				/>

				<W_Com_SaveFilePicker
					label="保存データファイル新規作成"
					value={savePath}
					onChange={setSavePath}
					defaultName="new.dat"
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

				{/* ▼ 秒数一覧 ＋ 計算設定 */}
				<div className="grid grid-cols-2 gap-8 w-full">

					{/* 左：秒数一覧テーブル */}
					<WFA_D_Fb_TimeInfoBox
						header="ヘッダー記載の秒数一覧表示"
						secondsList={secondsList}
					/>

					{/* 右：計算設定 */}
					<div className="flex flex-col gap-6">

						<W_Com_LabelSelectBox
							label="降雨引き延ばし（引き縮め）開始時間"
							value={calcStart}
							onChange={setCalcStart}
							options={["00:00", "01:00", "02:00"]}
						/>

						<W_Com_LabelSelectBox
							label="降雨引き延ばし（引き縮め）終了時間"
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

						{/* ▼ API 送信 */}
						<W_In_Button label="計算実行" onClick={handleSubmit} />

						<W_Feed_Pro_Bar label="progress" value={progress} />
						<W_Feed_Mess_Message text={message} />
					</div>
				</div>
			</div>
		</L_Layout>
	);
}