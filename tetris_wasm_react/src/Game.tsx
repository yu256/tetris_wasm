import { useEffect, useState } from "react";
import { keyDownHandler } from "./keyDownHandler";
import type { Tetris } from "./tetris";
import Field from "./Field";
import { ExecType } from "./enums";

type Props = {
	tetrisClass: new () => Tetris;
	nextBlocksIndexes: number[];
};

export default function Game({ tetrisClass, nextBlocksIndexes }: Props) {
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
			className="m-10 bg-gray-500"
			type="button"
			// biome-ignore lint/a11y/noAutofocus:
			autoFocus
			onKeyDown={keyDownHandler(exec, () => {
				if (!isGameOver) return;
				const tetris = new tetrisClass();
				setTetris((old) => {
					if (!old.isDeleted()) old.delete(); // React.StrictMode下のDevModeではコンポーネントが意図的に二回呼び出されるので確認が必要
					return tetris;
				});
				setIsGameOver(false);
				// biome-ignore lint/style/noNonNullAssertion:
				setCurrentState(tetris.exec(ExecType.Init, undefined)!);
			})}
		>
			<div>
				スコア: {score} レベル: {level} 消したライン数: {erasedlineCount}
			</div>
			<div className="grid grid-cols-5 gap-2">
				<Field
					className="bg-white m-2 rounded w-max h-max col-span-2"
					currentState={tetrisArr}
				/>
				<div className="col-span-2">
					<div className="m-2">Next</div>
					<span className="grid grid-cols-2 gap-3">
						{nextBlocksIndexes.map((i) => (
							<Field key={i} currentState={nextBlocks.get_unchecked(i)} />
						))}
					</span>
				</div>
				<div>
					<div className="m-2">Hold</div>
					<Field currentState={hold} />
				</div>
			</div>
		</button>
	);
}
