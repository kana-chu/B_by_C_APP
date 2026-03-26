/**
 * @component D_CS_Home
 * @folder Dat/ChangeScale
 * @category Page
 * @description
 *   dat ファイルの等倍計算画面。
 *   Electron → React → FastAPI のフローで、
 *   dat のブロック情報を表示しつつ、開始/終了時刻や倍率などを設定して計算実行する。
 *
 * @export default
 */

import { useState } from "react";
import L_Layout from "../../Styles/Layout/L_Layout";

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

    // ▼ ファイルパス関連
    const [path, setPath] = useState("");
    const [savePath, setSavePath] = useState("");

    // ▼ ブロック情報（秒, hms, datetime）
    const [timeInfoList, setTimeInfoList] = useState([]);

    // ▼ 計算設定
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [calcStart, setCalcStart] = useState("");
    const [calcEnd, setCalcEnd] = useState("");

    // ▼ SelectBox の options（{label, value}）
    const [calcOptions, setCalcOptions] = useState([]);

    const [multiplier, setMultiplier] = useState("");

    // ▼ 進行表示
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("準備中…");


    /** ▼ データ情報確定 */
    const handleInspect = async () => {
        if (!path) return setMessage("元データファイルを選択してください");
        if (!startDate) return setMessage("データ範囲（開始）を入力してください");

        setMessage("データ情報取得中…");
        setProgress(20);

        try {
            const data = await Mod_Api_Dat_Inspect({
                file_path: path,
                start_date: startDate,
            });

            const list = data.timeInfoList || [];
            setTimeInfoList(list);

            // ★ SelectBox 用に label & value に変換
            const opts = list.map(t => ({
                label: `${t.sec} 秒｜${t.hms}｜${t.datetime}`,
                value: t.sec,    // ← value は秒だけ（内部計算に便利）
            }));
            setCalcOptions(opts);

            setProgress(50);
            setMessage("データ情報読み取り完了");

        } catch (err) {
            console.error(err);
            setMessage("データ情報取得でエラー");
        }
    };


    /** ▼ 計算実行 */
    const handleSubmit = async () => {
        if (!path) return setMessage("元データファイルを選択してください");
        if (!savePath) return setMessage("保存先ファイルを作成してください");

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
                    label="① 元データファイル選択"
                    value={path}
                    onChange={setPath}
                />

                {/* ▼ 日付範囲 */}
                <div className="flex items-center gap-4">
                    <W_Com_LabelDateInput
                        label="② データ範囲（開始）"
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
                    label="③ データ情報確定"
                    onClick={handleInspect}
                />

                {/* ▼ 2カラム：左（55%）→一覧、右（45%）→計算設定 */}
                <div className="grid grid-cols-[11fr_9fr] gap-8">

                    {/* ★ 左：秒数一覧 */}
                    <WFA_D_Fb_TimeInfoBox
                        header="TIME リスト"
                        timeInfoList={timeInfoList}
                    />

                    {/* ★ 右：計算設定 */}
                    <div className="flex flex-col gap-6 items-start w-full">

                        <div className="w-full">
                            <W_Com_LabelSelectBox
                                label="④ 降雨引き延ばし（引き縮め）開始時間"
                                value={calcStart}
                                onChange={setCalcStart}
                                options={calcOptions}
                            />
                        </div>

                        <div className="w-full">
                            <W_Com_LabelSelectBox
                                label="⑤ 降雨引き延ばし（引き縮め）終了時間"
                                value={calcEnd}
                                onChange={setCalcEnd}
                                options={calcOptions}
                            />
                        </div>

                        <div className="w-full">
                            <W_Com_LabelTextInput
                                label="⑥ 計算倍率"
                                value={multiplier}
                                onChange={setMultiplier}
                                type="float"
                                unit="倍"
                                maxLength={6}
                            />
                        </div>

                    </div>
                </div>

                {/* ▼ 保存先ファイル */}
                <div className="w-full">
                    <W_Com_SaveFilePicker
                        label="⑦ 保存データファイル選択（新規作成も可）"
                        value={savePath}
                        onChange={setSavePath}
                        defaultName="new.dat"
                    />
                </div>

                {/* ▼ 進行：左7割 / 右3割 */}
                <div className="grid grid-cols-[7fr_3fr] gap-4 w-full">

                    <div className="flex flex-col gap-2 w-full">
                        <W_Feed_Pro_Bar label="progress" value={progress} />
                        <W_Feed_Mess_Message text={message} />
                    </div>

                    <div className="flex justify-end items-start w-full">
                        <W_In_Button
                            label="⑧ 計算実行"
                            onClick={handleSubmit}
                        />
                    </div>

                </div>

            </div>
        </L_Layout>
    );
}