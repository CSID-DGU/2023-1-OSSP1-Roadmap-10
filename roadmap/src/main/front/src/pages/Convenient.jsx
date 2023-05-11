import NavBar from "../components/Navbar.jsx";
import Footer from "../components/Footer";
import KakaoMap from "../components/KakaoMap.js";


function Convenient() {
  return (
    <div>
    <NavBar/>
    <h>
        Hello! This is New Roadmap ConvenientPage!
    </h>
    <KakaoMap page = "convenient"></KakaoMap>
    <Footer></Footer>
    </div>
  );
}

export default Convenient;