import { ExecType } from "./enums";

export const keyDownHandler =
	<T>(exec: (t: ExecType) => void, restartHandler: () => void) =>
	({ code }: React.KeyboardEvent<T>) => {
		switch (code) {
			case "ArrowLeft":
				return exec(ExecType.MoveLeft);
			case "ArrowRight":
				return exec(ExecType.MoveRight);
			case "ArrowDown":
				// todo 自由落下無限キャンセルが発生しないように長押しかどうかを判定する
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
