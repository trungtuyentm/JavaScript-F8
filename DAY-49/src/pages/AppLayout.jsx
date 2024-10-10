import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

function AppLayout() {
    return (
        <div className="w-full min-h-[100vh] mx-auto bg-gradient-to-r">
            <Navigation />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default AppLayout;
