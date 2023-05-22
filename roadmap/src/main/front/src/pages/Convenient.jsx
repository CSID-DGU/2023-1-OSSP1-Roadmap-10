import NavBar from "../components/Navbar.jsx";
import Footer from "../components/Footer";
import ConvenientPage from "../components/ConvenientPage.jsx";


function Convenient() {
  return (
    <div>
    <NavBar/>
    <h>
        Hello! This is New Roadmap ConvenientPage!
    </h>
    <ConvenientPage></ConvenientPage>
    <Footer></Footer>
    </div>
  );
}

export default Convenient;