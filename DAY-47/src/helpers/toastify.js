import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (msg, type, onClick, timing = 2500) => {
    toast[type](msg, {
        position: "top-right",
        autoClose: timing,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        onClick: onClick,
        theme: "colored",
    });
};

export default notify;
