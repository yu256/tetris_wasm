export default function repeatFn(
	callback: () => void,
	times: number,
	interval: number,
) {
	if (times === 0) return;

	let count = 0;
	const intervalId = setInterval(() => {
		if (++count === times) clearInterval(intervalId);
		callback();
	}, interval);
}
