
/**
 * @component App
 * @folder root
 * @category System
 * @description
 *   全ページのルーティング定義を行うアプリ最上位コンポーネント。
 *
 * @usage
 * ```jsx
 * <App />
 * ```
 *
 * @remarks
 *   - react-router-dom の BrowserRouter / Routes / Route を使用。
 *
 * @export default
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page コンポーネント
import Home from "./Home";
import D_CS_Home from "./Dat/ChangeScale/D_CS_Home";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>

				{/* ホーム */}
				<Route path="/" element={<Home />} />

				{/* DAT: Change Scale */}
				<Route path="/dat/change-scale" element={<D_CS_Home />} />

			</Routes>
		</BrowserRouter>
	);
}

