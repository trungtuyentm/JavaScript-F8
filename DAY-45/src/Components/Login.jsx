import { useState } from "react";
import { useLocalStorage } from "./Hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { getApiKey } from "./Libs/todoServer";

function Login() {
    const [form, setForm] = useState({ email: "" });
    const [loading, setLoading] = useState(false);
    const [apiKey, setApiKey] = useLocalStorage("apiKey", null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!apiKey) {
            setLoading(true);
            try {
                const token = await getApiKey(form.email);
                if (token) {
                    setApiKey(token);
                    console.log(token);
                    navigate("/todo", { state: { apiKey: token } });
                }
            } catch (error) {
                alert("Vui lòng nhập đúng email !");
                console.error("Error in handleSubmit:", error);
            } finally {
                setLoading(false);
            }
        }
    };
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [name]: value });
    };

    return (
        <div className="flex items-center flex-col gap-6">
            <h1 className="text-4xl font-bold text-white">Login</h1>
            <form
                action=""
                className="flex items-center ju gap-2 "
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    name="email"
                    placeholder="example@gmale.com"
                    className="w-[400px] h-12 border-none outline-none p-3 rounded-lg"
                    value={form.email}
                    onChange={(e) => {
                        handleChange(e);
                    }}
                />
                <button className="w-[100px] h-12 py-2 px-4 bg-rose-500 hover:bg-rose-700 text-white font-bold text-xl border-none rounded-lg">
                    {loading ? "Loading..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default Login;
