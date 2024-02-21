import Modal from "react-modal";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		transform: "translate(-50%, -50%)",
		width: "auto",
		borderRadius: "10px",
	},
} as const satisfies Modal.Styles;

type Props = {
	onClick?: ReadonlyArray<(() => void) | undefined>;
	isOpen: boolean;
};

const CurriedModal =
	(title: string) =>
	(items: ReadonlyArray<string>) =>
	({ onClick, isOpen }: Props) => (
		<Modal
			isOpen={isOpen}
			style={customStyles}
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			appElement={document.getElementById("root")!}
		>
			<div className="text-center font-serif mb-4 text-red-500 text-2xl">
				{title}
			</div>
			<div className="flex gap-2">
				{items.map((item, index) => (
					<button
						key={item}
						type="button"
						onClick={onClick?.at(index)}
						className="border-2 border-black p-1 rounded-lg hover:bg-yellow-100"
					>
						{item}
					</button>
				))}
			</div>
		</Modal>
	);

export default CurriedModal;
