import MobileText from "./MobileText";
import SourceMobile from "./SourceMobile";

function SectionMobile() {
    return (
        <section className="py-12 px-8 lg:py-24">
            <div className="container max-w-screen-lg mx-auto">
                <MobileText />
                <SourceMobile />
            </div>
        </section>
    );
}

export default SectionMobile;
