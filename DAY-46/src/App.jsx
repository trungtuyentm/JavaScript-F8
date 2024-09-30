import { Toaster } from "react-hot-toast";
import Login from "./Components/Login";
import ProductProvider from "./Context/productContext";
import Products from "./Components/Products";

function App() {
    return (
        <ProductProvider>
            <Login>
                <Products />
            </Login>
            <Toaster
                position="top-right"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                    success: {
                        duration: 2000,
                    },
                    error: {
                        duration: 2000,
                    },
                    style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "white",
                        color: "var(--color-grey-700)",
                    },
                }}
            />
        </ProductProvider>
    );
}

export default App;
