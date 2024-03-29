import { useReducer } from "react";
import Game from "./Game";
import Module, { type MainModule } from "../tetris";
import StartScreen from "./StartScreen";

let module: MainModule | undefined;

export default function App() {
	if (!module)
		// Promiseをthrowし、React SuspenseにPromise解決の間フォールバックさせる
		throw Module()
			.then((m) => {
				module = m;
			})
			.catch(console.error);

	const [isPushedPlay, toggleIsPushedPlay] = useReducer((is) => !is, false);

	return isPushedPlay ? (
		<Game tetrisClass={module.Tetris} returnToTitle={toggleIsPushedPlay} />
	) : (
		<StartScreen tetrisClass={module.Tetris} onClick={toggleIsPushedPlay} />
	);
}
