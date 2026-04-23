/**
 * @component App
 * @folder root
 * @category System
 * @description
 *   全ページのルーティング定義を行うアプリ最上位コンポーネント。
 *   初回起動時にローディング画面を表示し、その後に各ページへ遷移する。
 *
 * @usage
 * ```jsx
 * <App />
 * ```
 *
 * @remarks
 *   - react-router-dom の HashRouter  / Routes / Route を使用。
 *   - "読み込み中…" 表示はアプリ演出＆Electron / API 連動も可能。
 *
 * @export default
 */
import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "@/Home";
import P_CM_Home from "@/Pages/CreateMesh/P_CM_Home";
import P_CC_Home from "@/Pages/CalcCensus/P_CC_Home";
import P_CC_E_Home from "@/Pages/CalcCensus/Economic/P_CC_E_Home";
import P_CC_N_Home from "@/Pages/CalcCensus/National/P_CC_N_Home";
import P_CC_ECSV_Home from "@/Pages/CalcCensus/EconomicForCSV/P_CC_ECSV_Home";
import P_CC_NCSV_Home from "@/Pages/CalcCensus/NationalForCSV/P_CC_NCSV_Home";
import W_Dis_LoadingScreen from "@/Widgets/Display/W_Dis_LoadingScreen";

export default function App() {

    const [isLoading, setIsLoading] = useState(true);
    const [isElectronReady, setIsElectronReady] = useState(false);

    // Electron の ready を待つ
    useEffect(() => {
        if (window.electronAPI && window.electronAPI.onReady) {
            window.electronAPI.onReady(() => {
                setIsElectronReady(true);
            });
        } else {
            setIsElectronReady(true); // ブラウザ開発
        }
    }, []);

    // ready が来たら loading を解除
    useEffect(() => {
        if (isElectronReady) {
            const timer = setTimeout(() => setIsLoading(false), 400);
            return () => clearTimeout(timer);
        }
    }, [isElectronReady]);

    if (isLoading) return <W_Dis_LoadingScreen />;

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                {/*　メッシュ作成　*/}
                <Route path="/create-mesh" element={<P_CM_Home />} />

                {/*　センサス計算　*/}
                {/*　ホーム　*/}
                <Route path="/calc-census" element={<P_CC_Home />} />

                {/*　経済センサス　*/}
                <Route path="/calc-census/economic" element={<P_CC_E_Home />} />
                {/*　国勢調査　*/}
                <Route path="/calc-census/national" element={<P_CC_N_Home />} />

                {/*　経済センサス　*/}
                <Route path="/calc-census/economic-for-csv" element={<P_CC_ECSV_Home />} />
                {/*　国勢調査　*/}
                <Route path="/calc-census/national-for-csv" element={<P_CC_NCSV_Home />} />

            </Routes>
        </HashRouter >
    );
}