import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from "../MainPage/Mainpage.jsx";
import BuildingInfo from "../Buildinginfo/BuildingInfo.jsx";
import Map from "../Map/Map.jsx";
import Convenient from "../Convenient/Convenient.jsx";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}></Route>
                <Route path="/buildinginfo" element={<BuildingInfo></BuildingInfo>}></Route>
                <Route path="/map" element={<Map></Map>}></Route>
                <Route path="/convenient" element={<Convenient></Convenient>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
