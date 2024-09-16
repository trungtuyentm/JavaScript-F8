import ButtonFixed from "./components/ButtonFixed/ButtonFixed";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import NavBar from "./components/Header/NavBar";
import SectionClient from "./components/sections/SectionClient/SectionClient";
import SectionContact from "./components/Sections/SectionContact/SectionContact";
import SectionMobile from "./components/Sections/SectionMobile/SectionMobile";
import SectionPopular from "./components/Sections/SectionPopular/SectionPopular";
import SectionProject from "./components/sections/SectionProject/SectionProject";
import SectionResume from "./components/Sections/SectionResume/SectionResume";
import SectionSkill from "./components/sections/SectionSkill/SectionSkill";

function App() {
    return (
        <>
            <NavBar />
            <Header />
            <SectionClient />
            <SectionSkill />
            <SectionProject />
            <SectionResume />
            <SectionMobile />
            <SectionPopular />
            <SectionContact />
            <Footer />
            <ButtonFixed />
        </>
    );
}

export default App;
