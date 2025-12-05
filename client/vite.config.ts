import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
	server:{
		port:3000,
	    allowedHosts:["nchkl-2a0d-e487-217e-9bae-a195-fee6-bd5d-81aa.a.free.pinggy.link"],

	},
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
