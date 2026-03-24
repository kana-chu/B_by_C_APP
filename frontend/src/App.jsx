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
 *   - react-router-dom の BrowserRouter / Routes / Route を使用。
 *   - "読み込み中…" 表示はアプリ演出＆Electron / API 連動も可能。
 *
 * @export default
 */
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import D_CS_Home from "./Dat/ChangeScale/D_CS_Home";
import W_Dis_LoadingScreen from "./Widgets/Display/W_Dis_LoadingScreen";

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
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dat/change-scale" element={<D_CS_Home />} />
            </Routes>
        </BrowserRouter>
    );
}