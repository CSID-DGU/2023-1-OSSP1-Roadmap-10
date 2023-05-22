import React,{useEffect} from "react";
import KakaoMap from "../components/KakaoMap.jsx";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer.jsx"

function Map(){

    return(
    <div>
        <NavBar/>
        <h>
            Hello! This is New Roadmap MapPage!
        </h>
        <KakaoMap></KakaoMap>
        <Footer></Footer>
    </div>
    )
    
}

export default Map;