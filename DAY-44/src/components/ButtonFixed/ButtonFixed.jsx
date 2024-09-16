function ButtonFixed() {
    return (
        <a href="https://www.material-tailwind.com/" target="_blank">
            <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg bg-white text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none !fixed bottom-4 right-4 flex gap-1 pl-2 items-center border border-blue-gray-50">
                <img
                    src="https://www.material-tailwind.com/favicon.png"
                    alt="Material Tailwind"
                    width={128}
                    height={128}
                    loading="lazy"
                    decoding="async"
                    className="w-5 h-5"
                />
                Made With Material Tailwind
            </button>
        </a>
    );
}

export default ButtonFixed;
