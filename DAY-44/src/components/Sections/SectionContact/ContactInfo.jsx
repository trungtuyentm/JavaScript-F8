import Form from "./Form";
import Info from "./Info";

function ContactInfo() {
    return (
        <div>
            <div className=" flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md container mx-auto border border-gray/50">
                <div className="p-6 grid grid-cols-1 lg:grid-cols-7 md:gap-10">
                    <Info />
                    <Form />
                </div>
            </div>
        </div>
    );
}

export default ContactInfo;
