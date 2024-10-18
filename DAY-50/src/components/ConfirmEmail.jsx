import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/style.css";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "~/redux/actions/authActions";
import Loading from "./Loading";
import Board from "~/pages/Boards/_id";
import { config } from "~/assets/js/config";
import { client } from "~/assets/js/client";
import { mergeDataToBoard } from "~/utils/mergeData";
import { toast } from "react-toastify";
export const ConfirmEmail = () => {
    const { SERVER_API } = config;
    client.setUrl(SERVER_API);

    const [email, setEmail] = useState("");
    let [isLoading, setLoading] = useState(false);
    let [isConfirm, setConfirm] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("apiKey")) {
            setConfirm(true);
        }
    }, []);
    const handlechange = (e) => {
        setEmail(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        handleConfirm(email);
    };
    const handleConfirm = async (email) => {
        const { data } = await client.get(`/api-key?email=${email}`);
        if (data.code === 200) {
            const apiKey = data.data.apiKey;
            localStorage.setItem("apiKey", apiKey);
            setLoading(false);
            setConfirm(true);

            toast.success("Đăng nhập thành công");
        } else {
            setLoading(false);
            toast.error(data.message);
        }
    };

    return (
        <>
            {isLoading ? <Loading /> : ""}
            {isConfirm ? (
                <Board />
            ) : (
                <div className="login-form">
                    <form onSubmit={handleSubmit}>
                        <label>Enter your email address:</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handlechange}
                            required
                            className="form-control"
                        />
                        <button type="submit">Login</button>
                    </form>
                </div>
            )}
        </>
    );
};
