import { MinoKind } from "../types/enums";

const blockColor = (block: MinoKind) => {
	switch (block) {
		case MinoKind.None:
			return "text-white";
		case MinoKind.Wall:
			return "text-gray-500";
		case MinoKind.Ghost:
			return "text-gray-300";
		case MinoKind.I:
			return "text-blue-500";
		case MinoKind.O:
			return "text-yellow-500";
		case MinoKind.J:
			return "text-blue-700";
		case MinoKind.L:
			return "text-orange-500";
		case MinoKind.S:
			return "text-green-500";
		case MinoKind.T:
			return "text-purple-500";
		case MinoKind.Z:
			return "text-red-500";
	}
};

const defaultArr: ReadonlyArray<ReadonlyArray<number>> = new Array(4)
	.fill(0)
	.map(() => new Array(4).fill(0));

// indexをkeyとして使用しても問題ないパターンである 参考: https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318
const View = ({
	currentState = defaultArr,
	className = "bg-white w-min rounded m-auto",
}) => (
	<div className={className}>
		{currentState.map((x, index) => (
			// biome-ignore lint/suspicious/noArrayIndexKey:
			<div key={index}>
				{x.map((block, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey:
					<span key={index} className={`${blockColor(block)} shadow`}>
						■
					</span>
				))}
			</div>
		))}
	</div>
);

export default View;
