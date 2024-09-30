import PropTypes from "prop-types";

function ProductOrderItem({ name, quantity, left, price }) {
    return (
        <tr className="text-gray-700">
            <td className="px-4 py-3">
                <div className="flex items-center text-sm">
                    <p className="font-semibold">{name}</p>
                </div>
            </td>
            <td className="px-4 py-3 text-sm">{quantity}</td>
            <td className="px-4 py-3 text-sm">{left}</td>
            <td className="px-4 py-3 text-sm">{+price * +quantity}</td>
        </tr>
    );
}

ProductOrderItem.propTypes = {
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
};

export default ProductOrderItem;
