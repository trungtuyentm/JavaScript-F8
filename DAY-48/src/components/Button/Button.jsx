import { forwardRef } from "react";
const Button = forwardRef(function Button({ text, onClick }, ref) {
    return (
        <button
            className="bg-[#319795] transition px-3 py-2 rounded-md font-bold text-white text-lg hover:opacity-80"
            onClick={onClick}
            ref={ref}
        >
            {text}
        </button>
    );
});
export default Button;
