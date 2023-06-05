import React,{useEffect} from "react";
import BuildingInfoPage from "./BuildingInfoPage.jsx";
import NavBar from "../components/Navbar.jsx";

function BuildingInfo(){

    return(
        <div>
            <NavBar/>
            <BuildingInfoPage></BuildingInfoPage>
        </div>
    )
}

export default BuildingInfo;