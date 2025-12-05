import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./components/Home";
import {SnakeLoaderPage} from "@/features/snake/scenes/loader"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/snake" element={<SnakeLoaderPage />} />
			</Routes>
		</BrowserRouter>
	);
}

// tu veux que je refasse le meme back que le site propre ?
export default App;

// oui et on a share le port 3000 et 4000 normalement tout marche


// heu oui je pense vaut mieux fork le site, suprimmer tout les packages inutiles
// les truc inutiles genre asset qu'on va pas use et t