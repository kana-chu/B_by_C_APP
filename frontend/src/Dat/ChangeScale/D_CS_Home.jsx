import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

//共通レイアウト
import L_Layout from "../../Layout/L_Layout";

// ウィジェット - コンポジット
import { W_C_FileOrFolderPicker } from "../../Widgets/Composite";

export default function D_CS_Home() {
	return (
		<L_Layout title=".datファイルデータ等倍">

			{/* 元となる .dat ファイル選択 */}
			<W_C_FileOrFolderPicker
				label="元となる. dat データの選択"
				mode="folder"   // ← file / folder 切り替え
				value={path}
				onChange={(e) => {
					const files = e.target.files;

					if (files.length > 0) {
						// フォルダ選択のときは最初のファイルの相対パスが入る
						const file = files[0];

						const displayedPath =
							file.webkitRelativePath || file.name;

						setPath(displayedPath);
					}
				}}
			/>


			{/* 決定ボタン */}
			<button class="bg-indigo-700 font-semibold text-white py-2 px-4 rounded">
				決定
			</button>

		</L_Layout>
	);
}