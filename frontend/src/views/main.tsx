import { StrictMode, Suspense } from "react";
import App from "./App.tsx";
import "./index.css";
import { createRoot } from "react-dom/client";
import { rootElem } from "../lazy_const.ts";

document.body.addEventListener(
	"touchmove",
	(e) => {
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
