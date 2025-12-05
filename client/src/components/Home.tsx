import { TestGafamModal } from "@/features/quiz/modal";

function Home() {
	
	return (
		<div className="max-w-xl mx-auto flex flex-col gap-6 items-center justify-center min-h-screen">
			<a
				href="https://www.smartworldsolutions.tech/"
				target="_blank"
				rel="noopener"
			>
				<img
					src="/sws.png"
					className="w-[200px] mb-10 cursor-pointer"
					alt="SWS logo"
				/>
			</a>
			<TestGafamModal onClose={() => {}} />
			<h1 className="text-5xl font-black">Nuit de l'info 2025</h1>
		</div>
	);
}

export default Home;
