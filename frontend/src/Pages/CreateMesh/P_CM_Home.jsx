/**
 * @component P_CM_Home
 * @folder Pages/CreateMesh
 * @category Page
 * @description
 *    メッシュシート作成画面
 *
 * @usage
 *
 *
 * @export default
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import L_Layout from "@/Styles/Layout/L_Layout";

import { W_In_Button } from "@/Widgets/Inputs";
import { W_Feed_Mess_Message } from "@/Widgets/FeedBack/Message";

// Widgets/Composit
import {
    W_Com_LabelSelectBox,
    W_Com_LabelTextInput,
    W_Com_SaveFilePicker,
} from "@/Widgets/Composite";

import CalcOptions from "@/Feature/Constants/CalcOptions";

// API
import { F_Api_CreateMesh } from "@/Feature/Api/CreateMesh/F_Api_CreateMesh";


export default function P_CM_Home() {

    //  保存先ファイルパス
    const [savePath, setSavePath] = useState("");

    //  メッシュ設定
    const [leftUp, setLeftUp] = useState("");
    const [rightDown, setRightDown] = useState("");
    const [exMeshSize, setExMeshSize] = useState(
        CalcOptions.exMeshSize.defaultValue
    );
    const [Dummy, setDummy] = useState("");


    // ▼ 進行表示
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("計算実行前…");
    // ▼ 計算中フラグ
    const [isCalculating, setIsCalculating] = useState(false);

    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    const handleGoBefore = () => {
        navigate("/");
    };

    //　メッシュシート作成ボタン押下許可フラグ
    const canSubmit = !!(
        savePath &&
        leftUp &&
        rightDown &&
        exMeshSize &&
        !isCalculating
    );

    /** ▼ 計算実行 */
    const handleSubmit = async () => {
        if (!savePath) return setMessage("保存先ファイルを作成してください");

        setIsCalculating(true);   // ★ Progress 表示開始
        setProgress(0);
        setMessage("計算実行中…");

        try {
            const data = await F_Api_CreateMesh({
                savePath: savePath,
                leftUp: leftUp,
                rightDown: rightDown,
                exMeshSize: exMeshSize,
            });

            setProgress(100);
            setMessage(data.message ?? "処理完了");

        } catch (err) {
            console.error(err);
            setMessage("計算エラーが発生しました");

        } finally {
            setIsCalculating(false); // ★ 計算終了
        }
    };


    return (
        <L_Layout title="メッシュシート作成" onHome={handleGoHome} onBack={handleGoBefore}>
            <div className="flex flex-col gap-8 w-full">
                {/*　左上メッシュ番号 */}
                <W_Com_LabelTextInput
                    label="左上メッシュ番号(8桁)"
                    value={leftUp}
                    onChange={setLeftUp}
                    placeholder="12345678"
                    type="int"
                    unit=""
                    maxLength={8}
                />

                {/*　右下メッシュ番号 */}
                <W_Com_LabelTextInput
                    label="右下メッシュ番号(8桁)"
                    value={rightDown}
                    onChange={setRightDown}
                    placeholder="12345678"
                    type="int"
                    unit=""
                    maxLength={8}
                />

                {/*　作成メッシュサイズ */}
                <W_Com_LabelSelectBox
                    label="作成メッシュサイズ"
                    value={exMeshSize}
                    onChange={setExMeshSize}
                    options={CalcOptions.exMeshSize.options}
                />

                {/*　保存先ファイル作成 */}
                <W_Com_SaveFilePicker
                    label="保存データファイル選択（新規作成も可）"
                    value={savePath}
                    onChange={setSavePath}
                    defaultName="new.xlsx"
                />

                {/*　メッシュシート作成ボタン */}
                <W_In_Button
                    label="メッシュシート作成"
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                />

                <W_Feed_Mess_Message text={message} />
            </div>

        </L_Layout>
    );
}