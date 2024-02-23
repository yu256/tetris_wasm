import type { ExecType } from "./types/enums";

export interface Tetris {
	exec: <const T>(
		execType: T,
		time: number | undefined,
	) => T extends ExecType.Init
		? TetrisData
		: T extends ExecType
		  ? TetrisData | undefined
		  : never;
	isDeleted: () => boolean;
	delete: () => void;
}

type MinoShapeX = [number, number, number, number];
type MinoShape = [MinoShapeX, MinoShapeX, MinoShapeX, MinoShapeX];

interface NextBlocksPtr {
	// get: (index: number) => MinoShape;
	get_unchecked: (index: number) => MinoShape;
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
