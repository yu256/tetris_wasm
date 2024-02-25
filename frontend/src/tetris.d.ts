import type { ExecType } from "./types/enums";
import type { IntRange } from "./types/utilTypes";

export interface Tetris {
	exec: <const T extends ExecType>(
		execType: T,
		time: number | undefined,
	) => T extends ExecType.Init ? TetrisData : TetrisData | undefined;
	isDeleted: () => boolean;
	delete: () => void;
}

type MinoShapeX = [number, number, number, number];
type MinoShape = [MinoShapeX, MinoShapeX, MinoShapeX, MinoShapeX];

type NextBlocksLength = 3;

interface NextBlocksPtr {
	// get: (index: number) => MinoShape;
	get_unchecked: (index: IntRange<0, NextBlocksLength>) => MinoShape;
}

type Hold = MinoShape | undefined;

export type TetrisData = [TetrisArr, Hold, NextBlocksPtr, number, number];

type TetrisX = [
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
];

export type TetrisArr = [
	TetrisX,
	TetrisX,
	TetrisX,
	TetrisX,
	TetrisX,
	TetrisX,
	TetrisX,
	TetrisX,
	TetrisX,
	TetrisX,
	TetrisX,
	TetrisX,
	TetrisX,
	TetrisX,
	TetrisX,
	TetrisX,
	TetrisX,
	TetrisX,
	TetrisX,
	TetrisX,
	TetrisX,
];

export interface MainModule {
	Tetris: new () => Tetris;
}

declare const Module: () => Promise<MainModule>;

export default Module;
