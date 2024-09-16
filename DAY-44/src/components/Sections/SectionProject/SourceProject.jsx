import Button from "./ButtonSection";
import { projectData } from "./projectData";

function SourceProject() {
    return (
        <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2 xl:grid-cols-4">
            {projectData.map(({ id, image, title, desc }) => (
                <div
                    className=" flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-none"
                    key={id}
                >
                    <div className=" bg-clip-border rounded-xl overflow-hidden bg-white text-gray-700 shadow-lg mx-0 mt-0 mb-6 h-48">
                        <img
                            src={image}
                            alt={title}
                            loading="lazy"
                            width={768}
                            height={768}
                            decoding="async"
                            style={{ color: "transparent" }}
                        />
                    </div>
                    <div>
                        <a href="#">
                            <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-inherit mb-2">
                                {title}
                            </h5>
                        </a>
                        <p className="block antialiased font-sans text-base leading-relaxed text-inherit mb-6 font-normal !text-gray-500">
                            {desc}
                        </p>
                        <Button />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SourceProject;
