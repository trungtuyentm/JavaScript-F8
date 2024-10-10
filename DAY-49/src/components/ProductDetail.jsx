import { Link, useLoaderData } from "react-router-dom";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addCart } from "../store/cartSlice";

const api = import.meta.env.VITE_API;

function ProductDetail() {
    const data = useLoaderData().data;

    const dispatch = useDispatch();

    const productSelected = {
        _id: data._id,
        left: data.quantity - 1,
        name: data.name,
        price: data.price,
        quantity: 1,
        image: data.image,
        brand: data.brand,
    };

    function addToCart() {
        dispatch(addCart(productSelected));
    }

    const className =
        "text-white rounded-md h-[40px] px-2 py-2 bg-[#9d174d] hover:bg-[#c52665] transition-colors duration-300";

    if (!data) return <div>Loading...</div>;

    return (
        <div className="container mx-auto max-w-[1200px] pt-[100px] flex text-black">
            <div className="w-[25%] flex items-center justify-center py-2 px-2 rounded-md border-2 border-[#9d174d] bg-white">
                <img
                    src={data.image}
                    alt={data.name}
                    className="w-full object-cover rounded-md inline-block"
                />
            </div>
            <div className="w-[60%] ml-8 flex flex-col gap-3">
                <h2 className="text-[#9d174d] text-2xl font-bold">
                    {data.brand}
                </h2>
                <h3>{data.name}</h3>
                <p>{data.description}</p>
                <span>Category: {data.category}</span>
                <div className="flex justify-between">
                    <Button className={className}>
                        <Link to="/products/1">Go products!</Link>
                    </Button>
                    <div className="flex flex-col items-center gap-2">
                        <span>${data.price}</span>
                        <Button onClick={addToCart} className={className}>
                            Add to cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;

export async function loader({ request, params }) {
    const id = params.id;

    const res = await fetch(`${api}/${id}`);

    if (!res.ok) throw new Error("Fetching detail not found.");

    const data = await res.json();

    return data;
}
