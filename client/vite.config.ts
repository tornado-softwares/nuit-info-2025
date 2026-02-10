import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
	server:{
		port:3000,
	},
	plugins: [
		react(), 
		tailwindcss(),
		ViteImageOptimizer({
			png: { quality: 80 },
			jpeg: { quality: 75 },
			webp: { quality: 80 },
			avif: { quality: 70 },
			svg: {
				plugins: [
					{ name: 'sortAttrs' },
				],
			},
		}),
	],
	base: process.env.VITE_BASE_URL || "/", 
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
