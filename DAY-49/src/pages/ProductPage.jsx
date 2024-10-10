import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import ProductsList from "../components/ProductsList";
import Paginate from "../components/Paginate";

const api = import.meta.env.VITE_API;

function ProductPage() {
    const data = useLoaderData()?.data?.listProduct;

    if (!data) return <div>Loading...</div>;

    return (
        <div className="container py-3 mx-auto max-w-[1200px]">
            <h1 className="text-4xl font-bold text-center text-white">
                Products Shop
            </h1>
            <Suspense
                fallback={
                    <p className="text-center fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-yellow-500">
                        Loading...
                    </p>
                }
            >
                <Await resolve={data}>
                    <ProductsList data={data} />
                </Await>
            </Suspense>
            <Paginate />
        </div>
    );
}

export default ProductPage;

export async function loader({ request, params }) {
    const page = params.page;

    const res = await fetch(`${api}?page=${page}&limit=12`);

    const data = await res.json();

    return data;
}
