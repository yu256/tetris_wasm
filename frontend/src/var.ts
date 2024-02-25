export const rootElem = document.getElementById("root") as HTMLElement;

export const global: {
	readonly isSmartPhone: boolean;
	isTouchDevice?: boolean;
} = {
	isSmartPhone:
		!!navigator.userAgent.match(/iPhone|Android.+Mobile/) ||
		window.matchMedia("(max-device-width: 640px)").matches,
};
