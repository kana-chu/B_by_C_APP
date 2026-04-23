/**
 * @component P_CC_N_Home
 * @folder Pages/CalcCensus/National
 * @category Page
 * @description
 *    国勢調査計算画面
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
    W_Com_LabelDateInput,
    W_Com_LabelTextInput,
    W_Com_FileOrFolderPicker,
    W_Com_SaveFilePicker,
} from "@/Widgets/Composite";

import CalcOptions from "@/Feature/Constants/CalcOptions";

export default function P_CC_Home() {
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
            const data = await Mod_Api_Dat_ChangeScale({
                save_path: savePath,
                left_up: leftUp,
                right_down: rightDown,
                ex_meshSize: exMeshSize,
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
        <L_Layout title="国勢調査、経済センサス計算" onHome={handleGoHome} onBack={handleGoBefore}>

            <div className="flex flex-col gap-8 w-full">
                {/*　元データファイル選択 */}

                {/* ▼ 国勢調査 への遷移ボタン */}
                <W_In_Button
                    label="国勢調査"
                    onClick={() => navigate("/calc-census/national")}
                />

                {/* ▼ 経済センサス への遷移ボタン */}
                <W_In_Button
                    label="経済センサス"
                    onClick={() => navigate("/calc-census/economic")}
                />

            </div>

        </L_Layout>
    );
}