import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Slide, ToastContainer } from "react-toastify";

import Loading from "../Loading/Loading";
import LogoutButton from "../Logout/LogoutButton";
import notify from "../../helpers/toastify";

import "./Profile.css";

const Profile = () => {
    const { isLoading, user, isAuthenticated } = useAuth0();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const sendEmail = (e) => {
        setLoading(true);
        e.preventDefault();

        emailjs
            .sendForm(
                "service_s1bxua4",
                "template_n5d5dpl",
                e.target,
                "eB-jzObg7LceDDxX0"
            )
            .then(
                (result) => {
                    console.log(result.text);
                    console.log(result);
                    setLoading(false);
                    setMessage("");
                    notify("Gửi Email thành công", "success");
                },
                (error) => {
                    console.log(error.text);
                    notify(
                        "Gửi email không thành công. Vui lòng thử lại!",
                        "error"
                    );
                }
            );
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    return (
        <>
            {isAuthenticated && (
                <section>
                    {user?.picture && (
                        <img src={user.picture} alt={user.name} />
                    )}
                    <h2>Have a nice day {user?.name} !</h2>
                    {user.locale && (
                        <p>
                            Ngôn ngữ:{" "}
                            {user?.locale === "vi" ? "Tiếng Việt" : user.locale}
                        </p>
                    )}
                    {user.email && (
                        <p>
                            Email:{" "}
                            <a href={`mailto:${user?.email}`}>{user?.email}</a>
                        </p>
                    )}

                    <form
                        action=""
                        className="form-container"
                        onSubmit={sendEmail}
                    >
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Tên của bạn"
                            defaultValue={user.name}
                        />
                        <label htmlFor="email">Email: </label>
                        <input
                            type="email"
                            name="user_email"
                            id="email"
                            placeholder="Nhập email của bạn"
                            defaultValue={user.email}
                        />
                        <label htmlFor="message">Message:</label>
                        <textarea
                            type="text"
                            name="message"
                            id="message"
                            placeholder="Enter your message..."
                            value={message}
                            onChange={handleMessageChange}
                        />
                        <button type="submit" className="btn-support">
                            Send
                        </button>
                    </form>
                    <LogoutButton />
                </section>
            )}
            {(isLoading || loading) && <Loading />}
            <ToastContainer transition={Slide} />
        </>
    );
};

export default Profile;
