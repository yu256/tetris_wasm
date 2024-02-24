import { isSmartPhone } from "../lazy_const";
import { ExecType } from "../types/enums";

const Button = ({ onClick, children }: React.ComponentProps<"button">) => (
	<button
		type="button"
		className="bg-gray-400 w-12 h-12 rounded-full bg-opacity-30 outline-1 outline-white outline focus:outline-none"
		onClick={onClick}
	>
		{children}
	</button>
);

type Props = {
	exec: (execType: ExecType) => void;
};

const TouchController = ({ exec }: Props) =>
	isSmartPhone && (
		<div className="fixed bottom-0 left-0 w-full flex justify-center items-center p-4">
			<div className="grid grid-cols-3 gap-4">
				<div className="flex justify-center">
					<Button onClick={() => exec(ExecType.Hold)}>Hold</Button>
				</div>
				<div className="flex flex-col justify-center items-center">
					<div className="flex mt-2 gap-3">
						<Button onClick={() => exec(ExecType.RotateLeft)}>Rotate</Button>
						<Button onClick={() => exec(ExecType.RotateRight)}>Rotate</Button>
					</div>

					<div className="flex mt-2 gap-2">
						<Button onClick={() => exec(ExecType.MoveLeft)}>Left</Button>
						<Button onClick={() => exec(ExecType.SoftDrop)}>Drop</Button>
						<Button onClick={() => exec(ExecType.MoveRight)}>Right</Button>
					</div>
				</div>
				<div className="flex justify-center">
					<Button onClick={() => exec(ExecType.HardDrop)}>
						Hard
						<br />
						Drop
					</Button>
				</div>
			</div>
		</div>
	);

export default TouchController;
