import { defaultLayout } from "./layouts/default-layout";
import { about } from "./pages/about";
import { home } from "./pages/home";
import { productDetail } from "./pages/product-detail";
import { products } from "./pages/products";
import { router } from "./utils/router";

export const app = () => {
    return router(
        [
            {
                path: "/",
                component: home,
            },
            {
                path: "/gioi-thieu",
                component: about,
            },
            {
                path: "/san-pham",
                component: products,
            },
            {
                path: "/san-pham/:id",
                component: productDetail,
            },
        ],
        defaultLayout
    );
};
