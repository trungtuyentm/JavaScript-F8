import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import ProtectedRoute from "./Components/Routers/ProtectedRoute";
import Todo from "./Components/Todo";
import Login from "./Components/Login";

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        const apiKey = localStorage.getItem("apiKey");
        if (apiKey) {
            navigate("/todo");
        }
    }, [navigate]);

    return (
        <div className=" mx-auto w-full min-h-screen bg-gray-500 flex items-center justify-center p-12">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/todo"
                    element={<ProtectedRoute element={Todo} />}
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </div>
    );
}

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;
