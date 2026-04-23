import { useState, useEffect } from "react";

export function useCalcCensusSSE() {
    const [message, setMessage] = useState("");
    const [progress, setProgress] = useState(0);
    const [isCalculating, setIsCalculating] = useState(false);

    const startCalc = (payload) => {
        setIsCalculating(true);
        setProgress(0);

        const params = new URLSearchParams(payload).toString();
        const ev = new EventSource(
            `http://localhost:8000/calc-census/execute?${params}`
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
            setMessage("エラーが発生しました");
            setIsCalculating(false);
        };
    };

    return {
        message,
        progress,
        isCalculating,
        startCalc,
    };
}