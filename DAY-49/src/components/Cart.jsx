import { useDispatch, useSelector } from "react-redux";

import Button from "./Button";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import {
    checkoutCart,
    decrementCart,
    deleteCart,
    incrementCart,
} from "../store/cartSlice";
import toast from "react-hot-toast";

function Cart() {
    const cart = useSelector((store) => store.cart.cart);

    const dispatch = useDispatch();

    function handleIncrement(id) {
        dispatch(incrementCart(id));
    }

    function handleDecrement(id) {
        dispatch(decrementCart(id));
    }

    function handleDeleteCart(id) {
        if (confirm("Are your sure?")) dispatch(deleteCart(id));
    }

    function handleCheckoutCart() {
        dispatch(checkoutCart());
        toast.success("Thanh toán thành công!");
    }

    let content;

    if (cart.length <= 0) {
        content = (
            <>
                <div className="text-2xl font-bold text-center mt-10">
                    There is no product in your cart 😭
                </div>
                <Button className="text-white rounded-md h-[40px] px-2 py-2 bg-[#9d174d] hover:bg-[#c52665] transition-colors duration-300 w-fit mx-auto">
                    <Link to="/products/1">Go products!</Link>
                </Button>
            </>
        );
    } else {
        const totalPrice = cart.reduce((prev, item) => {
            return prev + item.price * item.quantity;
        }, 0);

        content = (
            <div className="flex flex-col gap-4">
                {cart.map((item) => {
                    return (
                        <div
                            key={item._id}
                            className="w-[800px] mx-auto bg-white text-black px-4 py-6 mt-1 rounded-md border border-slate-400 shadow-md"
                        >
                            <div className="flex gap-10 items-center">
                                <div>
                                    <Link to={`/product-detail/${item._id}`}>
                                        <img src={item.image} alt={item.name} />
                                    </Link>
                                </div>
                                <div className="flex flex-col gap-8 text-lg font-medium">
                                    <div className="flex gap-6">
                                        <span>{item.brand}</span>
                                        <span>{item.name}</span>
                                    </div>
                                    <div>Đơn giá: ${item.price}</div>
                                    <div>Còn lại: {item.left} sản phẩm</div>
                                </div>
                            </div>
                            <div className="flex justify-between mt-10">
                                <div className="flex gap-4 ml-14">
                                    <Button
                                        onClick={() =>
                                            handleDecrement(item._id)
                                        }
                                        className="border px-2 "
                                    >
                                        -
                                    </Button>
                                    <span>{item.quantity}</span>
                                    <Button
                                        onClick={() =>
                                            handleIncrement(item._id)
                                        }
                                        className="border px-2 "
                                    >
                                        +
                                    </Button>
                                </div>
                                <div className="text-xl font-bold">
                                    ${item.quantity * item.price}
                                </div>
                                <Button
                                    onClick={() => handleDeleteCart(item._id)}
                                >
                                    <MdDelete />
                                </Button>
                            </div>
                        </div>
                    );
                })}
                <div className="text-center text-3xl">
                    Total Price: ${totalPrice}
                </div>
                <div className="text-center mb-20 mt-5">
                    <Button className="bg-yellow-400 text-black px-3 py-2 rounded-tl-md rounded-bl-md w-[200px]">
                        <Link to="/products/1"> Go Products</Link>
                    </Button>
                    <Button
                        onClick={handleCheckoutCart}
                        className="bg-green-600 px-3 py-2 rounded-tr-md rounded-br-md w-[600px] text-white "
                    >
                        Checkout
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container pt-[100px] text-black mx-auto max-w-[1200px] flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-center">Shopping Cart</h1>
            {content}
        </div>
    );
}

export default Cart;
