import { defineConfig } from "vite";
import { preact } from "@preact/preset-vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		preact(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["favicon.ico", "apple-touch-icon.png"],
			injectRegister: "auto",
			manifest: {
				name: "tetris_wasm",
				short_name: "tetris",
				description: "Tetris written in C++ and React",
				theme_color: "#ffffff",
				icons: [
					{
						src: "192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
					{
						src: "512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
			},
		}),
	],
	base: "/tetris_wasm/",
});
