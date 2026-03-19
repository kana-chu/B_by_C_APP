export default function Layout({ title, children }) {
    return (
        <div className="min-h-screen w-full flex justify-center bg-gray-100">
            {/* 外枠：1000 × 800 */}
            <div className="w-250 h-200 bg-white shadow-lg overflow-hidden">

                {/* ▼ タイトルバー（ページタイトル共通パーツ） */}
                <div className="h-15 bg-blue-200 rounded-md flex items-center px-4 shadow
                        mx-4 mt-4">
                    <h1 className="text-lg font-bold">{title}</h1>
                </div>

                {/* 内枠：700 × 900（横中央・縦上寄せ・上50px空白）※Tailwind では 1rem = 4px（デフォルト）700px=175 w-[700px]といっしょ */}
                <div className="w-230 h-180 mx-auto p-5">
                    {/* ▼ ページ固有内容 */}
                    {children}

                </div>
            </div>
        </div>
    );
}
