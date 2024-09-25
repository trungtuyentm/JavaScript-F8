import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function TodoAdd({ onAddTodo }) {
    const [form, setForm] = useState({ todo: "" });
    const [loading, setLoading] = useState(false);
    const handleAddTodo = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!form.todo) {
                toast.error("Tasks cannot be left blank!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    className: "custom-toast",
                    bodyClassName: "custom-body-toast",
                    progressClassName: "custom-progress-error",
                });
                return;
            }
            await onAddTodo({ todo: form.todo });

            toast.success("Added successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                className: "custom-toast",
                bodyClassName: "custom-body-toast",
                progressClassName: "custom-progress",
            });

            setForm({ todo: "" });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const handleChangeValue = (value) => {
        setForm({ ...form, todo: value });
    };
    return (
        <form
            action=""
            className="w-full flex py-4 mb-5"
            onSubmit={handleAddTodo}
        >
            <input
                type="text"
                placeholder="Add Task..."
                spellCheck="false"
                value={form.todo}
                className="w-2/3 h-14 border-2 border-none outline-none p-3 font-sans font-medium text-base rounded-l-lg"
                onChange={(e) => {
                    handleChangeValue(e.target.value);
                }}
            />
            <button className="w-1/3 bg-teal-500 hover:bg-teal-700 text-white text-xl font-bold rounded-r-lg">
                {loading ? "Adding..." : "Add Task"}
            </button>
        </form>
    );
}
TodoAdd.propTypes = {
    onAddTodo: PropTypes.func.isRequired,
};
export default TodoAdd;
