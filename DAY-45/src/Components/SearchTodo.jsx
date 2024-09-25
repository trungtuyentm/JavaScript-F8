import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDebounce } from "./Hooks/useDebounce";
function SearchTodo({ onSearchTodo, onDebounceSearch }) {
    const [form, setForm] = useState({ todoSearched: "" });
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const debounceSearchTerm = useDebounce(searchTerm, 800);
    useEffect(() => {
        const fetchSearch = async () => {
            setLoading(true);
            try {
                if (debounceSearchTerm) {
                    const result = await onDebounceSearch(debounceSearchTerm);
                    if (result && result.length > 0) {
                        setNoResults(false);
                    } else {
                        setNoResults(true);
                    }
                } else {
                    await onDebounceSearch("");
                    setNoResults(false);
                }
            } catch (error) {
                console.error("Error searching for todo:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSearch();
    }, [debounceSearchTerm]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const todoSearched = form.todoSearched;
            await onSearchTodo(todoSearched);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const handleSearchValue = (value) => {
        setForm({ ...form, todoSearched: value });
        setSearchTerm(value);
    };
    return (
        <form action="" onSubmit={handleSearch} className="w-full">
            <div className="flex py-4 mb-5">
                <input
                    type="search"
                    placeholder="Search Task..."
                    spellCheck="false"
                    value={searchTerm}
                    className="w-2/3 h-14 border-2 border-none outline-none p-3 font-sans font-medium text-base rounded-l-lg"
                    onChange={(e) => {
                        handleSearchValue(e.target.value);
                    }}
                />
                <button className="w-1/3 bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold rounded-r-lg">
                    {loading ? "Searching..." : "Search"}
                </button>
            </div>
            {noResults && !loading && (
                <p className="bg-white pt-5 pb-5 pl-5 rounded-lg text-red-500 font-bold block mb-5">
                    No matching tasks found.
                </p>
            )}
        </form>
    );
}
SearchTodo.propTypes = {
    onSearchTodo: PropTypes.func.isRequired,
    onDebounceSearch: PropTypes.func.isRequired,
};
export default SearchTodo;
