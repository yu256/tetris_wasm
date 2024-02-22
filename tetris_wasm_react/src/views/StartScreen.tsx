import { useEffect, useState } from "react";
import GameView from "../components/GameView";
import type { MainModule } from "../tetris";
import { ExecType } from "../enums";
import * as random from "../random";
import repeatFn from "../repeat";

type Props = {
	tetrisClass: MainModule["Tetris"];
};

const Preview = ({ tetrisClass }: Props) => {
	const [tetris, setTetris] = useState(() => new tetrisClass());
	const [state, setState] = useState(
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		() => tetris.exec(ExecType.Init, undefined)!,
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
							// biome-ignore lint/style/noNonNullAssertion: <explanation>
							return tetris.exec(ExecType.Init, undefined)!;
						})(),
				),
			1000,
		);
		const interval2 = setInterval(() => {
			const type: ExecType = random.random(2, 9);
			const repeat = (() => {
				switch (type) {
					case ExecType.SoftDrop:
						return 1;
					case ExecType.HardDrop:
					case ExecType.Hold:
						return random.chance(5) ? 1 : 0;
					default:
						return random.random(0, 3);
				}
			})();

			repeatFn(
				() => {
					const state = !tetris.isDeleted() && tetris.exec(type, undefined);
					if (state) setState(state);
				},
				repeat,
				200,
			);
		}, 1000);
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
	<div className="grid grid-cols-3 text-center">
		<div className="bg-black rounded-3xl w-min mx-auto my-5 p-10 col-span-2">
			<div className="font-bold text-9xl font-serif">
				<span className="text-red-500">T</span>
				<span className="text-orange-500">E</span>
				<span className="text-yellow-500">T</span>
				<span className="text-green-500">R</span>
				<span className="text-blue-500">I</span>
				<span className="text-purple-500">S</span>
			</div>
			<button
				type="button"
				className="text-lg font-semibold px-16 py-4 align-middle text-gray-800 border border-solid rounded-full bg-gradient-to-b from-white to-gray-400 shadow-xl hover:shadow-2xl hover:from-gray-400 hover:to-white hover:scale-95 duration-300 m-10"
				onClick={onClick}
			>
				Play
			</button>
		</div>
		<Preview tetrisClass={tetrisClass} />
	</div>
);

export default StartScreen;
