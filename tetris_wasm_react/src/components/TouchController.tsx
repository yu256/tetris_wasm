import { ExecType } from "../types/enums";

type Props = {
	exec: (execType: ExecType) => void;
};

const isSmartPhone =
	!!navigator.userAgent.match(/iPhone|Android.+Mobile/) ||
	window.matchMedia("(max-device-width: 640px)").matches;

const TouchController = ({ exec }: Props) =>
	isSmartPhone && (
		<div className="fixed bottom-0 left-0 w-full flex justify-center items-center p-4">
			<div className="grid grid-cols-3 gap-4">
				<div className="flex justify-center">
					<button
						type="button"
						className="bg-gray-400 w-12 h-12 rounded-full focus:outline-none"
						onClick={() => exec(ExecType.Hold)}
					>
						Hold
					</button>
				</div>
				<div className="flex flex-col justify-center items-center">
					<div className="flex mt-2 gap-3">
						<button
							type="button"
							className="bg-gray-400 w-min h-12 rounded-full focus:outline-none"
							onClick={() => exec(ExecType.RotateLeft)}
						>
							Rotate
						</button>
						<button
							type="button"
							className="bg-gray-400 w-min h-12 rounded-full focus:outline-none"
							onClick={() => exec(ExecType.RotateRight)}
						>
							Rotate
						</button>
					</div>

					<div className="flex mt-2">
						<button
							type="button"
							className="bg-gray-400 w-12 h-12 rounded-full mr-2 focus:outline-none"
							onClick={() => exec(ExecType.MoveLeft)}
						>
							Left
						</button>
						<button
							type="button"
							className="bg-gray-400 w-12 h-12 rounded-full mr-2 focus:outline-none"
							onClick={() => exec(ExecType.SoftDrop)}
						>
							Drop
						</button>
						<button
							type="button"
							className="bg-gray-400 w-12 h-12 rounded-full focus:outline-none"
							onClick={() => exec(ExecType.MoveRight)}
						>
							Right
						</button>
					</div>
				</div>
				<div className="flex justify-center">
					<button
						type="button"
						className="bg-gray-400 w-12 h-12 rounded-full focus:outline-none"
						onClick={() => exec(ExecType.HardDrop)}
					>
						Hard
						<br />
						Drop
					</button>
				</div>
			</div>
		</div>
	);

export default TouchController;
