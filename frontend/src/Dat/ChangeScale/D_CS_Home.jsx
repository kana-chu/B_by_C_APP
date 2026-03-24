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

// Composite
import {
    W_Com_LabelSelectBox,
    W_Com_LabelDateInput,
    W_Com_LabelTextInput,
    W_Com_FileOrFolderPicker,
    W_Com_SaveFilePicker,
} from "../../Widgets/Composite";

import { W_In_Button } from "../../Widgets/Inputs";

// Feedback
import { W_Feed_Pro_Bar } from "../../Widgets/FeedBack/Progress";
import { W_Feed_Mess_Message } from "../../Widgets/FeedBack/Message";

// Table
import { WFA_D_Fb_TimeInfoBox } from "../../WidgetsForApp/ForDat/Feedback";

// API
import { Mod_Api_Dat_ChangeScale } from "../../Modules/Api/Dat/Mod_Api_Dat_ChangeScale";
import { Mod_Api_Dat_Inspect } from "../../Modules/Api/Dat/Mod_Api_Dat_Inspect";

export default function D_CS_Home() {

    // ▼ パス管理
    const [path, setPath] = useState("");
    const [savePath, setSavePath] = useState("");

    // ▼ ブロック情報 / 秒数情報
    const [timeInfoList, setTimeInfoList] = useState([]);

    // ▼ 計算関連
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [calcStart, setCalcStart] = useState("");
    const [calcEnd, setCalcEnd] = useState("");
    const [multiplier, setMultiplier] = useState("");

    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("準備中…");

    /** ▼ 元データファイル */
    const handleSelectInputFile = async () => {
        const abs = await window.electronAPI.selectFile("file");
        if (abs) setPath(abs);
    };

    /** ▼ データ情報確定（F_BuildDatBlockInfo 呼び出し） */
    const handleInspect = async () => {
        if (!path) {
            setMessage("元データファイルを選択してください");
            return;
        }
        if (!startDate) {
            setMessage("基準となる開始日（データ範囲開始）を入力してください");
            return;
        }

        setMessage("データ情報取得中…");
        setProgress(20);

        try {
            const data = await Mod_Api_Dat_Inspect({
                file_path: path,
                start_date: startDate,
            });

            setTimeInfoList(data.timeInfoList || []);
            setProgress(50);
            setMessage("データ情報読み取り完了");

        } catch (err) {
            console.error(err);
            setMessage("データ情報取得でエラー");
        }
    };

    /** ▼ 保存先ファイル（新規作成） */
    const handleSelectSaveFile = async () => {
        const abs = await window.electronAPI.saveDialog("new.dat");
        if (abs) setSavePath(abs);
    };

    /** ▼ 等倍計算 API 呼び出し */
    const handleSubmit = async () => {
        if (!path) {
            setMessage("元データファイルを選択してください");
            return;
        }
        if (!savePath) {
            setMessage("保存先ファイルを作成してください");
            return;
        }

        setMessage("計算実行中…");
        setProgress(20);

        try {
            const data = await Mod_Api_Dat_ChangeScale({
                file_path: path,
                save_path: savePath,
                start_date: startDate,
                end_date: endDate,
                calc_start: calcStart,
                calc_end: calcEnd,
                multiplier,
            });

            setProgress(100);
            setMessage(data.message ?? "処理完了");

        } catch (err) {
            console.error(err);
            setMessage("計算エラーが発生しました");
        }
    };

    return (
        <L_Layout title="datファイル等倍計算">

            <div className="flex flex-col gap-8 w-full">

                {/* ▼ 元データファイル */}
                <W_Com_FileOrFolderPicker
                    label="元データファイル選択"
                    value={path}
                    onChange={setPath}
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

                {/* ▼ データ情報確定 */}
                <W_In_Button
                    label="データ情報確定"
                    onClick={handleInspect}
                />

                {/* ▼ 秒数一覧テーブル */}
                <WFA_D_Fb_TimeInfoBox
                    header="秒数 → 時間表記 → 絶対日時"
                    timeInfoList={timeInfoList}
                />

                {/* ▼ 保存先ファイル */}
                <W_Com_SaveFilePicker
                    label="保存データファイル新規作成"
                    value={savePath}
                    onChange={setSavePath}
                    defaultName="new.dat"
                />

                {/* ▼ 計算設定 */}
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

                    {/* ▼ 計算実行 */}
                    <W_In_Button
                        label="計算実行"
                        onClick={handleSubmit}
                    />

                    <W_Feed_Pro_Bar label="progress" value={progress} />
                    <W_Feed_Mess_Message text={message} />
                </div>
            </div>

        </L_Layout>
    );
}