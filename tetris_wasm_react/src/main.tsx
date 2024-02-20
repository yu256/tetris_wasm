import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Suspense fallback="loading...">
			<App />
		</Suspense>
	</StrictMode>,
);
