export const rootElem = document.getElementById("root") as HTMLElement;

export const isSmartPhone =
	!!navigator.userAgent.match(/iPhone|Android.+Mobile/) ||
	window.matchMedia("(max-device-width: 640px)").matches;
