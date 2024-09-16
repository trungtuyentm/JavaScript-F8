import Image from "./Image";

function SectionClient() {
    const popStyle = {
        color: "transparent",
    };
    return (
        <section className="px-8 py-28">
            <div className="container mx-auto text-center">
                <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-8">
                    My awesome clients
                </h6>
                <Image popStyle={popStyle} />
            </div>
        </section>
    );
}

export default SectionClient;
