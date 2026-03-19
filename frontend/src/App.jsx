import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { BrowserRouter, Routes, Route } from "react-router-dom";

// 総合ホーム
import Home from "./Home";

// datファイルを等倍
import D_CS_Home from "./Dat/ChangeScale/D_CS_Home";


export default function App() {
	return (
		<BrowserRouter>
			<Routes>

				{/* 全体ホーム */}
				<Route
					path="/"
					element={<Home />}
				/>

				{/* datデータを等倍 */}
				<Route
					path="/dat/change-scale"
					element={<D_CS_Home />}
				/>


			</Routes>
		</BrowserRouter>
	);
}

