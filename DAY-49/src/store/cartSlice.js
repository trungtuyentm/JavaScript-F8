import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: JSON.parse(localStorage.getItem("product"))
            ? JSON.parse(localStorage.getItem("product"))
            : [],
    },
    reducers: {
        addCart(state, action) {
            const indexSelected = state.cart.findIndex(
                (c) => c._id === action.payload._id
            );

            if (indexSelected === -1) {
                state.cart.push(action.payload);
            } else {
                state.cart[indexSelected].quantity =
                    state.cart[indexSelected].quantity + 1;
                state.cart[indexSelected].left =
                    state.cart[indexSelected].left - 1;
            }

            localStorage.setItem("product", JSON.stringify(state.cart));

            state.cart = JSON.parse(localStorage.getItem("product"));

            toast.success(`Đã thêm sản phẩm ${action.payload.name} vào giỏ`);
        },
        incrementCart(state, action) {
            const cartSelected = state.cart.find(
                (item) => item._id === action.payload
            );
            cartSelected.quantity = cartSelected.quantity + 1;
            cartSelected.left = cartSelected.left - 1;

            localStorage.setItem("product", JSON.stringify(state.cart));
        },
        decrementCart(state, action) {
            const cartSelected = state.cart.find(
                (item) => item._id === action.payload
            );

            if (cartSelected.quantity > 1) {
                cartSelected.quantity = cartSelected.quantity - 1;
                cartSelected.left = cartSelected.left + 1;
            } else {
                state.cart = state.cart.filter(
                    (item) => item._id !== action.payload
                );
            }

            localStorage.setItem("product", JSON.stringify(state.cart));
        },
        deleteCart(state, action) {
            state.cart = state.cart.filter(
                (item) => item._id !== action.payload
            );

            localStorage.setItem("product", JSON.stringify(state.cart));
        },
        checkoutCart(state, action) {
            state.cart = [];
            localStorage.removeItem("product");
        },
    },
});

export const {
    addCart,
    orderCart,
    incrementCart,
    decrementCart,
    deleteCart,
    checkoutCart,
    setLoading,
    removeLoading,
} = cartSlice.actions;

export default cartSlice.reducer;
