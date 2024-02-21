import { useEffect, useState } from "react";
import { keyDownHandler } from "../keyDownHandler";
import type { Tetris } from "../tetris";
import Field from "./Field";
import { ExecType } from "../enums";
import Modal from "./Modal";

type Props = {
	tetrisClass: new () => Tetris;
	returnToTitle: () => void;
};

const GameOverModal = Modal("GameOver")(["リトライ (Rキー)", "タイトルに戻る"]);

export default function Game({ tetrisClass, returnToTitle }: Props) {
	const [tetris, setTetris] = useState(() => new tetrisClass());
	const [
		[tetrisArr, hold, nextBlocks, score, erasedlineCount],
		setCurrentState,
	] = useState(
		// biome-ignore lint/style/noNonNullAssertion: 初回の実行でundefinedが返ってくることはない(返ってくるのはゲームオーバー後)
		() => tetris.exec(ExecType.Init, undefined)!,
	);
	const [isGameOver, setIsGameOver] = useState(false);

	const exec = (execType: ExecType) => {
		const newState = tetris.exec(execType, Date.now());
		if (newState) setCurrentState(newState);
		else setIsGameOver(true);
	};

	const restart = () => {
		if (!isGameOver) return;
		const tetris = new tetrisClass();
		setTetris((old) => {
			if (!old.isDeleted()) old.delete(); // React.StrictMode下のDevModeではコンポーネントが意図的に二回呼び出されるので確認が必要
			return tetris;
		});
		setIsGameOver(false);
		// biome-ignore lint/style/noNonNullAssertion:
		setCurrentState(tetris.exec(ExecType.Init, undefined)!);
	};

	const level = Math.floor(erasedlineCount / 10);

	// execをdepsに入れてしまうと、execは関数オブジェクトなので毎回インスタンスが違うためにレンダリング毎実行されてしまう
	// useMemoでキャッシュするという手もあるが、execが依存しているのはtetrisオブジェクト、tetrisオブジェクトが変わるのと同時にisGameOverがtrueからfalseに変わる
	// そのため、isGameOverが変わったときに再実行されればそれで十分である
	// biome-ignore lint/correctness/useExhaustiveDependencies:
	useEffect(() => {
		const intervalId = !isGameOver
			? setInterval(
					() => exec(ExecType.FreeFall),
					Math.max(150, 1000 - Math.log2(level + 1) ** 2 * 50),
			  )
			: null;

		return () => {
			if (intervalId) clearInterval(intervalId);
		};
	}, [isGameOver, level]);

	return (
		<button
			className="w-full focus:outline-none"
			type="button"
			// biome-ignore lint/a11y/noAutofocus:
			autoFocus
			onKeyDown={keyDownHandler(exec, restart)}
		>
			<GameOverModal onClick={[restart, returnToTitle]} isOpen={isGameOver} />
			<div className=" bg-gray-500 border-4 rounded border-black w-max mx-auto my-20">
				<div className="font-mono text-orange-400">
					{score} P L.{level} {erasedlineCount}-Lines
				</div>
				<div className="grid grid-cols-4 gap-1">
					<Field
						className="bg-white rounded w-max h-max m-2 col-span-3"
						currentState={tetrisArr}
					/>
					<div className="grid grid-cols-1">
						<div className="w-min h-min">
							<div className="mb-2 text-white font-serif">Hold</div>
							<Field currentState={hold} />
						</div>
						<div className="w-min h-min">
							<div className="mb-2 text-white font-serif">Next</div>
							<span className="grid gap-2">
								{[0, 1, 2].map((i) => (
									<Field key={i} currentState={nextBlocks.get_unchecked(i)} />
								))}
							</span>
						</div>
					</div>
				</div>
			</div>
		</button>
	);
}
