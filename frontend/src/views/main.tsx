import { StrictMode, Suspense } from "react";
import App from "./App.tsx";
import "./index.css";
import { createRoot } from "react-dom/client";
import { global, rootElem } from "../var.ts";

document.body.addEventListener(
	"touchmove",
	(e) => {
		global.isTouchDevice ??= true;
		if (e.touches.length > 1) {
			e.preventDefault();
		}
	},
	{ passive: false },
);

createRoot(rootElem).render(
	<StrictMode>
		<Suspense fallback="loading...">
			<App />
		</Suspense>
	</StrictMode>,
);
