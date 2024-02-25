import { useEffect, useState } from "react";
import GameView from "../components/GameView";
import type { MainModule } from "../tetris";
import { ExecType } from "../types/enums";
import * as random from "../random";
import repeatFn from "../repeat";
import Button from "../components/Button";
import { global } from "../var";

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
		const intervalIds = [
			setInterval(
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
			),
			setInterval(() => {
				const type: ExecType = random.random(2, 9);

				const repeat =
					type === ExecType.HardDrop || type === ExecType.Hold
						? Number(random.chance(30)) // true -> 1 | false -> 0
						: random.random(1, 4);

				repeatFn(
					() => {
						const state = !tetris.isDeleted() && tetris.exec(type, undefined);
						if (state) setState(state);
					},
					repeat,
					150,
				);
			}, 800),
		];

		return () => intervalIds.forEach(clearInterval);
	}, [tetris]);

	return <GameView TetrisData={state} />;
};

const StartScreen = ({
	onClick,
	tetrisClass,
}: React.ComponentProps<"button"> & Props) => (
	<div
		className={`bg-black rounded-3xl w-min mx-auto my-5 text-center flex ${
			global.isSmartPhone ? "flex-col p-2" : "flex-row-reverse p-10 gap-3"
		}`}
	>
		<Preview tetrisClass={tetrisClass} />
		<div
			className={`font-bold font-serif m-auto ${
				global.isSmartPhone ? "flex text-6xl" : "text-7xl grid"
			}`}
		>
			<span className="text-red-500">T</span>
			<span className="text-orange-500">E</span>
			<span className="text-yellow-500">T</span>
			<Button onClick={onClick}>Play</Button>
			<span className="text-green-500">R</span>
			<span className="text-blue-500">I</span>
			<span className="text-purple-500">S</span>
		</div>
	</div>
);

export default StartScreen;
