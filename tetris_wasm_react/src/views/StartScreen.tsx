import { useEffect, useState } from "react";
import GameView from "../components/GameView";
import type { MainModule } from "../tetris";
import { ExecType } from "../types/enums";
import * as random from "../random";
import repeatFn from "../repeat";
import Button from "../components/Button";

type Props = {
	tetrisClass: MainModule["Tetris"];
};

const Preview = ({ tetrisClass }: Props) => {
	const [tetris, setTetris] = useState(() => new tetrisClass());
	const [state, setState] = useState(() =>
		tetris.exec(ExecType.Init, undefined),
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: tetrisClassは不変
	useEffect(() => {
		const interval1 = setInterval(
			() =>
				setState(
					tetris.exec(ExecType.FreeFall, undefined) ??
						(() => {
							const tetris = new tetrisClass();
							setTetris((old) => {
								if (!old.isDeleted()) old.delete();
								return tetris;
							});
							return tetris.exec(ExecType.Init, undefined);
						})(),
				),
			1000,
		);

		const interval2 = setInterval(() => {
			const type: ExecType = random.random(2, 9);

			const repeat =
				type === ExecType.HardDrop || type === ExecType.Hold
					? Number(random.chance(30))
					: random.random(1, 4);

			repeatFn(
				() => {
					const state = !tetris.isDeleted() && tetris.exec(type, undefined);
					if (state) setState(state);
				},
				repeat,
				150,
			);
		}, 800);
		return () => {
			clearInterval(interval1);
			clearInterval(interval2);
		};
	}, [tetris]);
	return <GameView TetrisData={state} />;
};

const StartScreen = ({
	onClick,
	tetrisClass,
}: React.ComponentProps<"button"> & Props) => (
	<div className="bg-black rounded-3xl w-min mx-auto my-5 p-10 text-center flex">
		<div className="font-bold text-7xl font-serif grid m-auto">
			<span className="text-red-500">T</span>
			<span className="text-orange-500">E</span>
			<span className="text-yellow-500">T</span>
			<Button onClick={onClick}>Play</Button>
			<span className="text-green-500">R</span>
			<span className="text-blue-500">I</span>
			<span className="text-purple-500">S</span>
		</div>
		<Preview tetrisClass={tetrisClass} />
	</div>
);

export default StartScreen;
