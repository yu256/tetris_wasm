const Button = ({ onClick, children }: React.ComponentProps<"button">) => (
	<button
		type="button"
		className="text-lg m-auto h-min w-max font-semibold px-4 py-4 align-middle text-gray-800 border border-solid rounded-full bg-gradient-to-b from-white to-gray-400 shadow-xl hover:shadow-2xl hover:from-gray-400 hover:to-white hover:scale-95 duration-300 font-mono"
		onClick={onClick}
	>
		{children}
	</button>
);

export default Button;
