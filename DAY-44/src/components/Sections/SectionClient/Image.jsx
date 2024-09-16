import { imageSrc } from "./imageData";
import PropTypes from "prop-types";
function Image({ popStyle }) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-6">
            {imageSrc.map(({ image, id }) => (
                <img
                    key={id}
                    src={image}
                    alt={`logo ${id}`}
                    loading="lazy"
                    width={768}
                    height={768}
                    decoding="async"
                    className="w-40"
                    style={popStyle}
                />
            ))}
        </div>
    );
}

Image.propTypes = {
    popStyle: PropTypes.object.isRequired,
};
export default Image;
