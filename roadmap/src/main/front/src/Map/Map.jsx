import React,{useEffect} from "react";
import KakaoMap from "./KakaoMap.jsx";
import NavBar from "../components/Navbar.jsx";

function Map(){

    return(
        <div>
            <NavBar/>
            <KakaoMap></KakaoMap>
        </div>
    )
}

export default Map;