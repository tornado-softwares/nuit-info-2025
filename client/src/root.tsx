import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import {SnakeLoaderPage} from "@/features/snake/scenes/loader"
import { PowerOnSelfTestPage } from "./features/chatbot/scenes/power-on-self-test";
import { WindowsXpLoaderPage } from "./features/chatbot/scenes/windows-xp-loader";
import { WindowsXpDesktopPage } from "./features/chatbot/scenes/windows-xp-desktop";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/snake" element={<SnakeLoaderPage />} />

				<Route path="/chatbot" element={<PowerOnSelfTestPage />} />
				<Route path="/chatbot/loader" element={<WindowsXpLoaderPage />} />
				<Route path="/chatbot/desktop" element={<WindowsXpDesktopPage />} />
			</Routes>
		</BrowserRouter>
	);
}
 
export default App; 