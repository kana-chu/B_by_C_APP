/**
 * @component P_CC_E_Help
 * @folder Pages/CalcCensus/Economic
 * @category PageFragment
 * @description
 *   経済センサス計算画面 用のヘルプ／設定／補助UIをまとめるための
 *   追加ウインドウ用コンテンツ。
 *
 *   - L_Layout の extraWindowContent に渡して使用する
 *   - 将来：
 *       ・画面説明
 *       ・入力ルール
 *       ・設定UI
 *       ・注意事項
 *       ・別Widget
 *     を自由に追加可能
 *
 * @usage
 *   <L_Layout extraWindowContent={<P_CC_E_Help />} />
 *
 * @export default
 */

export default function P_CC_E_Help() {
    return (
        <div className="flex flex-col gap-6 text-[var(--ui-text)] text-xs">

            {/* ===== セクション：概要 ===== */}
            <section>
                <h2 className="text-sm font-bold mb-2">
                    この画面について
                </h2>
                <p className="leading-relaxed">
                    経済センサス計算画面では、元データ Excel をもとに
                    各種シートを指定し、集計処理を実行します。
                </p>
            </section>

            {/* ===== セクション：基本操作 ===== */}
            <section>
                <h3 className="font-bold mb-1">
                    基本操作の流れ
                </h3>
                <ol className="list-decimal pl-5 space-y-1">
                    <li>元データファイルを選択します</li>
                    <li>シート一覧を確認します</li>
                    <li>割合シート・項目シートを選択します</li>
                    <li>経済センサスデータシートを指定します</li>
                    <li>出力条件を設定し、計算を実行します</li>
                </ol>
            </section>

            {/* ===== セクション：注意事項 ===== */}
            <section>
                <h3 className="font-bold mb-1 text-[var(--ui-text-warning)]">
                    注意事項
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                    <li>項目シートは A/B/C列の2行目以降を実データとして読み取ります</li>
                    <li>1行目はヘッダーとして扱われます</li>
                    <li>空行は自動的に無視されます</li>
                </ul>
            </section>

            {/* ===== 見本 ===== */}
            <section className="border-t pt-4 border-[var(--ui-card-border)]">
                <h3 className="font-bold mb-1">
                    見本
                </h3>
                <p className="text-[var(--ui-text-sub)]">
                    説明
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-[var(--ui-text-sub)]">
                    <li>サンプルデータのプレビュー</li>
                </ul>
            </section>

        </div>
    );
}