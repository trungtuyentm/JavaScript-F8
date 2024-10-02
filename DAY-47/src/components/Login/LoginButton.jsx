/* eslint-disable react/no-unescaped-entities */
import { useAuth0 } from "@auth0/auth0-react";

import Loading from "../Loading/Loading";
import "./Login.css";

const LoginButton = () => {
    const { isLoading, loginWithPopup, isAuthenticated } = useAuth0();

    return (
        <>
            {isLoading && <Loading />}
            {!isAuthenticated && (
                <div className="login">
                    <div className="container">
                        <h1 className="title">Welcome to F8</h1>
                        <span>Thank you for using F8's services</span>
                        <p>
                            If you have any questions or help, log in and ask
                            here!
                        </p>
                        <button onClick={() => loginWithPopup()}>
                            Login || Register
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoginButton;
