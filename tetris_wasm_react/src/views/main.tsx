import { StrictMode, Suspense } from "react";
import App from "./App.tsx";
import "./index.css";
import { createRoot } from "react-dom/client";
import { rootElem } from "../lazy_const.ts";

createRoot(rootElem).render(
	<StrictMode>
		<Suspense fallback="loading...">
			<App />
		</Suspense>
	</StrictMode>,
);
