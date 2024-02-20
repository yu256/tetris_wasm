import { useState } from "react";
import Game from "./Game";
import Module, { type MainModule } from "../tetris";

const StartScreen = ({ onClick }: React.ComponentProps<"button">) => (
	<button type="button" onClick={onClick}>
		Play
	</button>
);

let module: MainModule | undefined;

export default function App() {
	const [isPushedPlay, setIsPushedPlay] = useState(false);
	if (!module)
		// Promiseをthrowし、React SuspenseにPromise解決の間フォールバックさせる
		throw Module()
			.then((m) => {
				module = m;
			})
			.catch(console.error);

	return isPushedPlay ? (
		<div>
			<Game tetrisClass={module.Tetris} />
		</div>
	) : (
		<StartScreen onClick={() => setIsPushedPlay(true)} />
	);
}
