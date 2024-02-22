import { StrictMode, Suspense } from "react";
import App from "./App.tsx";
import "./index.css";
import { createRoot } from "react-dom/client";

export const rootElem = document.getElementById("root") as HTMLElement;

createRoot(rootElem).render(
	<StrictMode>
		<Suspense fallback="loading...">
			<App />
		</Suspense>
	</StrictMode>,
);
