import { useState } from "react";

/**
 * CSV 高速モード用 Census 計算 SSE Hook
 */
export function useCalcCensusSSE_CSV() {
    const [message, setMessage] = useState("");
    const [progress, setProgress] = useState(0);
    const [isCalculating, setIsCalculating] = useState(false);

    const startCalcCSV = (payload: Record<string, any>) => {
        setIsCalculating(true);
        setProgress(0);
        setMessage("");

        const params = new URLSearchParams(payload).toString();
        const ev = new EventSource(
            `http://localhost:8000/calc-census/execute-csv?${params}`
        );

        ev.onmessage = (e) => {
            const data = JSON.parse(e.data);
            setMessage(data.message);
            setProgress(data.progress);

            if (data.progress >= 100) {
                ev.close();
                setIsCalculating(false);
            }
        };

        ev.onerror = () => {
            ev.close();
            setMessage("CSV 計算中にエラーが発生しました");
            setIsCalculating(false);
        };
    };

    return {
        message,
        progress,
        isCalculating,
        startCalcCSV,
    };
}