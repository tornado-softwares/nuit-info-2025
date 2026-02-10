import { BrowserRouter, Routes, Route } from "react-router";
import { OpenningPage } from "@/features/openning/components/page";
import { MissionPage } from "@/features/mission/page";
import {SnakeLoaderPage} from "@/features/snake/scenes/loader"
import { PowerOnSelfTestPage } from "./features/chatbot/scenes/power-on-self-test";
import { WindowsXpLoaderPage } from "./features/chatbot/scenes/windows-xp-loader";
import { WindowsXpDesktopPage } from "./features/chatbot/scenes/windows-xp-desktop";
import { CrazyForm } from "./features/crazyform/main"
import { FemmeInformatique } from "./features/femme/main";

function App() {
	return (
		<BrowserRouter basename={import.meta.env.BASE_URL}>
			<Routes>
				<Route path="/" element={<OpenningPage />} />
				<Route path="/mission" element={<MissionPage />} />
				<Route path="/snake" element={<SnakeLoaderPage />} />
				<Route path="/chatbot" element={<PowerOnSelfTestPage />} />
				<Route path="/chatbot/loader" element={<WindowsXpLoaderPage />} />
				<Route path="/chatbot/desktop" element={<WindowsXpDesktopPage />} />
				<Route path="/crazyform" element={<CrazyForm/>}/>
				<Route path="/femmeetinfo" element={<FemmeInformatique/>}/>

			</Routes>
		</BrowserRouter>
	);
}
 
export default App; 