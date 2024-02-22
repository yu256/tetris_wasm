import { ExecType } from "./types/enums";

export const keyDownHandler =
	<T>(exec: (t: ExecType) => void, restartHandler: () => void) =>
	({ code }: React.KeyboardEvent<T>) => {
		switch (code) {
			case "ArrowLeft":
				return exec(ExecType.MoveLeft);
			case "ArrowRight":
				return exec(ExecType.MoveRight);
			case "ArrowDown":
				return exec(ExecType.SoftDrop);
			case "Space":
				return exec(ExecType.HardDrop);
			case "KeyZ":
				return exec(ExecType.RotateLeft);
			case "KeyX":
				return exec(ExecType.RotateRight);
			case "KeyH":
				return exec(ExecType.Hold);
			case "KeyR":
				return restartHandler();
		}
	};
