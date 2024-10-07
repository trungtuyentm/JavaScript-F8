import FormSubmit from "./components/FormSubmit/FormSubmit";
import Nav from "./components/Nav/Nav";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import TableHistory from "./components/TableHistory/TableHistory";
import Toast from "./components/Toast/Toast";
import Welcome from "./components/Welcome/Welcome";
import "react-toastify/dist/ReactToastify.css";
function App() {
    return (
        <>
            <Toast />
            <ProgressBar />
            <div className="container mx-auto max-w-[calc(100%-40px)]">
                <Nav />
                <Welcome />
                <FormSubmit />
                <TableHistory />
            </div>
        </>
    );
}
export default App;
