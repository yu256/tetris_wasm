import { useEffect, useState } from "react";
import { keyDownHandler } from "../keyDownHandler";
import type { Tetris } from "../tetris";
import { ExecType } from "../types/enums";
import Modal from "../components/Modal";
import GameView from "../components/GameView";
import TouchController from "../components/TouchController";

type Props = {
	tetrisClass: new () => Tetris;
	returnToTitle: () => void;
};

const GameOverModal = Modal("GameOver")(["リスタート", "タイトルに戻る"]);

export default function Game({ tetrisClass, returnToTitle }: Props) {
	const [tetris, setTetris] = useState(() => new tetrisClass());
	const [tetrisData, setCurrentState] = useState(() =>
		tetris.exec(ExecType.Init, undefined),
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
		setCurrentState(tetris.exec(ExecType.Init, undefined));
	};

	const level = Math.floor(tetrisData[4] / 10);

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
			: undefined;

		return () => clearInterval(intervalId);
	}, [isGameOver, level]);

	return (
		<>
			<button
				className="w-full focus:outline-none"
				type="button"
				// biome-ignore lint/a11y/noAutofocus:
				autoFocus
				onKeyDown={keyDownHandler(exec)}
			>
				<GameView TetrisData={tetrisData} level={level}>
					<GameOverModal
						onClick={[restart, returnToTitle]}
						isOpen={isGameOver}
					/>
				</GameView>
			</button>
			<TouchController exec={exec} />
		</>
	);
}
