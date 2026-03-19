
/**
 * @component Home
 * @folder root
 * @category Page
 * @description
 *   アプリのホーム画面。
 *   Widgets/Inputs（W_In_*）と共通レイアウト（L_Layout）を使用。
 *
 * @usage
 * ```jsx
 * <Home />
 * ```
 *
 * @remarks
 *   - react-router-dom の useNavigate を使用して画面遷移
 *   - UI の構成は最小限のボタンのみ
 *
 * @export default
 */

import { useNavigate } from "react-router-dom";

// 共通レイアウト
import L_Layout from "./Layout/L_Layout";

// Widgets/Inputs
import {
	W_In_Button,
	W_In_FileOrFolderPicker,
	W_In_DateInput,
	W_In_SelectBox,
	W_In_TextInput,
} from "./Widgets/Inputs";

export default function Home() {
	const navigate = useNavigate();

	return (
		<L_Layout title="Home（ホーム）">

			{/* ▼ ChangeScale への遷移ボタン */}
			<W_In_Button
				label="datファイルデータ等倍"
				onClick={() => navigate("/dat/change-scale")}
			/>


		</L_Layout>
	);
}