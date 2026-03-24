export default function Layout({ title, children }) {
    return (
        <div className="min-h-screen w-full flex justify-center bg-gray-100">

            {/* 外枠：1000 × 800 */}
            <div className="w-[1000px] h-[800px] bg-white shadow-lg overflow-hidden">

                {/* タイトルバー */}
                <div className="h-[60px] bg-blue-200 rounded-md flex items-center px-4 shadow mx-4 mt-4">
                    <h1 className="text-lg font-bold font-meiryo">{title}</h1>
                </div>

                {/* 内枠：700 × 900 */}
                <div className="w-[700px] h-[900px] mx-auto p-5 text-xs">
                    {children}
                </div>

            </div>
        </div>
    );
}
