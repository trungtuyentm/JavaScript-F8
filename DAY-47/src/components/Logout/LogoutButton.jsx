import { useState, useRef, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Slide, ToastContainer } from "react-toastify";

import Loading from "../Loading/Loading";
import notify from "../../helpers/toastify";
import "./Logout.css";

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const notifyIdRef = useRef(null);

    const handleLogout = () => {
        setIsLoggingOut(true);
        notifyIdRef.current = setTimeout(() => {
            notify("Đang đăng xuất...", "success");
        }, 1000);

        setTimeout(() => {
            logout({ logoutParams: { returnTo: window.location.origin } });
        }, 2500);
    };

    useEffect(() => {
        return () => {
            if (notifyIdRef.current) {
                clearTimeout(notifyIdRef.current);
            }
        };
    }, []);

    return (
        <>
            {isLoggingOut && <Loading />}
            {isAuthenticated && (
                <button
                    onClick={handleLogout}
                    className="btn-logout"
                    disabled={isLoggingOut}
                >
                    Sign Out
                </button>
            )}
            {isLoggingOut && <ToastContainer transition={Slide} />}
        </>
    );
};

export default LogoutButton;
