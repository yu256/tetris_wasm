import type { IntRange } from "./types/utilTypes";

export const chance = (percentage: IntRange<0, 100>) =>
	Math.random() < percentage / 100;

export const random = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min) + min);
