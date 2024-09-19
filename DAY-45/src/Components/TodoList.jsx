import PropTypes from "prop-types";
import { useState } from "react";
function TodoList({ todos, onDeleteTodo, onEditTodo }) {
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [completed, setCompleted] = useState(false);
    const handelDeleteTodo = (index) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete?"
        );
        if (confirmDelete) {
            onDeleteTodo(index);
        }
    };
    const handleEditSubmit = (index) => {
        if (editValue.trim() !== "") {
            onEditTodo(index, editValue, completed);
        } else {
            onEditTodo(index, todos[index].todo, completed);
        }
        setEditIndex(null);
        setEditValue("");
        setCompleted(false);
    };

    return (
        <div className="w-full ">
            <ul className="w-full">
                {todos?.map(({ todo, isCompleted }, index) => {
                    return (
                        <li
                            className="w-full item bg-white rounded-lg p-7 h-25 mb-8"
                            key={index}
                        >
                            <div className="w-full h-12 mb-5 flex items-center gap-1 px-2 border border-gray-400 bg-white rounded-lg">
                                <input
                                    type="checkbox"
                                    checked={
                                        editIndex === index
                                            ? completed
                                            : isCompleted
                                    }
                                    onChange={(e) => {
                                        if (editIndex === index) {
                                            setCompleted(e.target.checked);
                                        } else {
                                            onEditTodo(
                                                index,
                                                todo,
                                                e.target.checked
                                            );
                                        }
                                    }}
                                    className="appearance-none cursor-pointer bg-white border-green-700 border-2 w-5 h-5 mr-2 rounded-full ease-linear group-hover:shadow-checkbox  checked:border-secondary checked:bg-green-400"
                                    style={{
                                        display: `${
                                            editIndex === index
                                                ? "block"
                                                : "none"
                                        }`,
                                    }}
                                />
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        value={
                                            editValue !== "" ? editValue : todo
                                        }
                                        onChange={(e) =>
                                            setEditValue(e.target.value)
                                        }
                                        className="w-full text-base font-medium text-black bg-transparent outline-none  border-white break-words break-all"
                                    />
                                ) : (
                                    <>
                                        {isCompleted ? (
                                            <span className="line-through text-base font-medium text-black break-words ">
                                                {todo?.length >= 80
                                                    ? todo.slice(0, 80) + "."
                                                    : todo}
                                            </span>
                                        ) : (
                                            <span className="text-base font-medium text-black break-words ">
                                                {todo?.length >= 80
                                                    ? todo.slice(0, 80) + "."
                                                    : todo}
                                            </span>
                                        )}
                                    </>
                                )}
                            </div>
                            <div className="w-1/3 h-11 rounded-r-lg flex item-center justify-between gap-2">
                                {editIndex === index ? (
                                    <>
                                        <button
                                            className="bg-green-500 border-none w-1/2 text-white text-base font-bold cursor-pointer hover:bg-green-600 rounded-md"
                                            onClick={() =>
                                                handleEditSubmit(index)
                                            }
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="bg-red-400 border-none w-1/2 text-white text-base font-bold cursor-pointer hover:bg-red-500 rounded-md "
                                            onClick={() => setEditIndex(null)}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="bg-teal-500 border-none w-1/2 text-white text-base font-bold cursor-pointer hover:bg-teal-600 rounded-md"
                                            onClick={() => {
                                                setEditIndex(index);
                                                setEditValue(todo);
                                                setCompleted(isCompleted);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 border-none w-1/2 text-white text-base font-bold cursor-pointer hover:bg-red-600 rounded-md "
                                            onClick={() =>
                                                handelDeleteTodo(index)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
TodoList.propTypes = {
    todos: PropTypes.array,
    onDeleteTodo: PropTypes.func,
    onEditTodo: PropTypes.func,
};
export default TodoList;
