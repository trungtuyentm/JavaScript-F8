import { useProduct } from "../Context/productContext";
import ProductItem from "./ProductItem";

function ProductList() {
    const { products } = useProduct();

    return (
        <>
            {products?.map((product) => (
                <ProductItem key={product._id} product={product} />
            ))}
        </>
    );
}

export default ProductList;
