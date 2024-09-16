import ContactInfo from "./ContactInfo";
import ContactText from "./ContactText";

function SectionContact() {
    return (
        <section className="px-8 py-16">
            <ContactText />
            <ContactInfo />
        </section>
    );
}

export default SectionContact;
