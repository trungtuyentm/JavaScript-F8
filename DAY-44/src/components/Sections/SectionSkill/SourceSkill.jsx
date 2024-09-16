import { sourceData } from "./sourceData";

function SourceSkill() {
    return (
        <div className="container mx-auto grid grid-cols-1 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {sourceData.map(({ id, icon, title, desc }) => (
                <div
                    className="flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-none"
                    key={id}
                >
                    <div className="p-6 grid justify-center text-center">
                        <div
                            className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-full bg-gray-900 p-2.5 text-white shadow"
                            dangerouslySetInnerHTML={{ __html: icon }}
                        ></div>
                        <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 mb-2">
                            {title}
                        </h5>
                        <p className="block antialiased font-sans text-base leading-relaxed text-inherit px-8 font-normal !text-gray-500">
                            {desc}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SourceSkill;
