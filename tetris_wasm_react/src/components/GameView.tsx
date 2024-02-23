import { ReactNode } from "react";
import type { TetrisData } from "../tetris";
import Field from "./Field";

type Props = {
	TetrisData: Readonly<TetrisData>;
	level?: number;
	children?: ReactNode;
};

const View = ({
	TetrisData: [tetrisArr, hold, nextBlocks, score, erasedlineCount],
	level,
	children,
}: Props) => (
	<>
		{children}
		<div className=" bg-gray-500 border-4 rounded w-max mx-auto my-20">
			<div className="font-mono text-orange-400">
				{score} P L.{level ?? Math.floor(erasedlineCount / 10)}{" "}
				{erasedlineCount}
				-Lines
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
	</>
);

export default View;
