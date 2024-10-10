import { FaCartPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import Logo from "../assets/Logo.ico";

function Navigation() {
    const param = useParams().page;

    const cart = useSelector((store) => store.cart.cart);

    const totalCart = cart.reduce((prev, item) => prev + item.quantity, 0);

    return (
        <div className="container h-15 p-4 px-12 text-2xl text-white bg-[#252B48] mx-auto max-w-full flex items-center justify-between fixed">
            <NavLink
                to={`/products/${param ? param : "1"}`}
                className="h-full w-12"
            >
                <img src={Logo} alt="logo" />
            </NavLink>
            <div>
                <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                        isActive
                            ? "text-yellow-400 font-bold relative"
                            : "font-bold relative"
                    }
                >
                    <FaCartPlus className="text-3xl" />
                    {cart.length > 0 && (
                        <span className="absolute top-[-15px] bg-white text-lg w-[25px] h-[25px] flex justify-center items-center rounded-full right-[-30px] text-orange-600">
                            {totalCart}
                        </span>
                    )}
                </NavLink>
            </div>
        </div>
    );
}

export default Navigation;
