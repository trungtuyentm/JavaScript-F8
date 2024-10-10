import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import ProductPage from "./pages/ProductPage";
import { loader as ProductLoader } from "./pages/ProductPage";
import { loader as ProductDetailLoader } from "./components/ProductDetail";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/products/1" replace />,
            },
            {
                path: "/products/:page",
                element: <ProductPage />,
                loader: ProductLoader,
            },
            {
                path: "/product-detail/:id",
                element: <ProductDetail />,
                loader: ProductDetailLoader,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
