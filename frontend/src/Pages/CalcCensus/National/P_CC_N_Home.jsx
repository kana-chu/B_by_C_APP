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

// Widgets/Composit
import {
    W_Com_LabelSelectBox,
    W_Com_LabelDateInput,
    W_Com_LabelTextInput,
    W_Com_FileOrFolderPicker,
    W_Com_SaveFilePicker,
} from "@/Widgets/Composite";

export default function P_CC_Home() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    const handleGoBefore = () => {
        navigate("/calc-census");
    };

    return (
        <L_Layout title="国勢調査計算" onHome={handleGoHome} onBack={handleGoBefore}>

            <div className="flex flex-col gap-8 w-full">
                {/*　元データファイル選択 */}

                {/*　決定、シート一覧表示 */}

                {/*　割合シート選択 */}

                {/*　項目シート選択 */}

                {/*　項目一覧表示 */}

                {/*　元データシート選択　*/}

                {/*　元データメッシュサイズ */}

                {/*　出力メッシュサイズ選択 */}

            </div>
        </L_Layout >
    );
}