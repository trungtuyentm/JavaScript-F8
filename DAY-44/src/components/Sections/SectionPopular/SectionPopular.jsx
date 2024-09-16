import Image from "../SectionClient/Image";
import PopularText from "./PopularText";

function SectionPopular() {
    const popStyle = {
        width: "10rem",
        filter: "grayscale(100%)",
        opacity: "0.75",
    };
    return (
        <section className="py-8 px-8 lg:py-20">
            <div className="container mx-auto grid items-center place-items-center">
                <PopularText />
                <Image popStyle={popStyle} />
            </div>
        </section>
    );
}

export default SectionPopular;
