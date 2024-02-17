export interface Tetris {
	exec(execType: ExecType, time: number | undefined): TetrisData;
	isDeleted: () => boolean;
	delete(): void;
}

type MinoShapeX = [number, number, number, number];
export type MinoShape = [MinoShapeX, MinoShapeX, MinoShapeX, MinoShapeX];

interface NextBlocks {
	get: (index: number) => MinoShape;
	get_unchecked: (index: number) => MinoShape;
}

export type Hold = MinoShape | undefined;

export type TetrisData = [TetrisArr, Hold, NextBlocks, number, number];

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
