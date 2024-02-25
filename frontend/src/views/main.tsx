import { StrictMode, Suspense } from "react";
import App from "./App.tsx";
import "./index.css";
import { createRoot } from "react-dom/client";
import { global, rootElem } from "../var.ts";

document.body.addEventListener(
	"touchstart",
	() => {
		global.isTouchDevice ??= true;
	},
	{ once: true },
);

document.body.addEventListener("touchmove", (e) => {
	if (e.touches.length > 1) {
		e.preventDefault();
	}
});

createRoot(rootElem).render(
	<StrictMode>
		<Suspense fallback="loading...">
			<App />
		</Suspense>
	</StrictMode>,
);
