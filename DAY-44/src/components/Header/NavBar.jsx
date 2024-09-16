import { Link } from "react-router-dom";
function NavBar() {
    return (
        <nav className="block py-4 backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 border-white/80 w-full max-w-full rounded-none px-4 bg-white border-0 sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between">
                <p className="block antialiased font-sans text-blue-gray-900 text-lg font-bold">
                    Material Tailwind
                </p>
                <ul className="ml-10 hidden items-center gap-8 lg:flex">
                    <li>
                        <Link
                            to="/page"
                            className="antialiased font-sans text-base leading-relaxed flex items-center gap-2 font-medium text-gray-900"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 016.75 6h10.5a3 3 0 012.683 1.657A4.505 4.505 0 0018.75 7.5H5.25z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            Page
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/account"
                            className="antialiased font-sans text-base leading-relaxed flex items-center gap-2 font-medium text-gray-900"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            Account
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="https://www.material-tailwind.com/docs/react/installation"
                            className="antialiased font-sans text-base leading-relaxed flex items-center gap-2 font-medium text-gray-900"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden="true"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm3.97.97a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06zm4.28 4.28a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            Docs
                        </Link>
                    </li>
                </ul>
                <div className="flex items-center gap-2">
                    <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20">
                        SIGN IN
                    </button>
                    <a href="https://www.material-tailwind.com/blocks">
                        <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
                            BLOCKS
                        </button>
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
