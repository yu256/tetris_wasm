export default function repeatFn(
	callback: () => void,
	times: number,
	interval: number,
) {
	if (!times) return;

	let count = 0;
	const intervalId = setInterval(() => {
		if (count === times) clearInterval(intervalId);

		callback();
		count++;
	}, interval);
}
