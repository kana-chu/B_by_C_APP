import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// 共通レイアウト
import L_Layout from "./Layout/L_Layout";

// インプットウィジェット
import {
	W_I_Button,
	W_I_FileOrFolderPicker,
	W_I_DateInput,
	W_I_SelectBox,
	W_I_TextInput
} from "./Widgets/Inputs";

export default function Home() {
	const navigate = useNavigate();

	return (
		<L_Layout title="Home（ホーム）">

			{/* ▼ CDR_HOME への遷移ボタン（インプット版） */}
			<W_I_Button
				label="datファイルデータ等倍"
				onClick={() => navigate("/dat/change-scale")}
			/>

		</L_Layout>
	);
}