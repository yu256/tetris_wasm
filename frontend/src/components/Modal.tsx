import Modal from "react-modal";
import Button from "./Button";
import { isSmartPhone, rootElem } from "../var";

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
		<Modal isOpen={isOpen} style={customStyles} appElement={rootElem}>
			<div className="text-center font-serif mb-4 text-red-500 text-2xl">
				{title}
			</div>
			<div className={`flex gap-2 ${isSmartPhone ? "flex-col" : ""}`}>
				{items.map((item, index) => (
					<Button key={item} onClick={onClick?.at(index)}>
						{item}
					</Button>
				))}
			</div>
		</Modal>
	);

export default CurriedModal;
