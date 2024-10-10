import ProductItem from "./ProductItem";

function ProductsList({ data }) {
    return (
        <div className="mt-11">
            <div className="flex justify-center items-center text-4xl font-semibold space-x-5 tracking-wider">
                PRODUCTS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center mt-7 gap-5">
                {data.map((product) => (
                    <ProductItem key={product._id} {...product} />
                ))}
            </div>
        </div>
    );
}

export default ProductsList;
