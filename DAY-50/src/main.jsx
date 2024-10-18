import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <CssBaseline />
        <Provider store={store}>
            <App />
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
            />
        </Provider>
    </React.StrictMode>
);
