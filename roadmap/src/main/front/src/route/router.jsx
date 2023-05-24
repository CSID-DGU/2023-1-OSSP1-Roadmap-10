import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../MainPage/Mainpage";
import Map from "../Map/Map";
import Convenient from "../convenient/Convenient";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Navigate to="/mainPage" />}></Route>
        <Route path="mainPage" element={<MainPage></MainPage>}></Route>
        <Route path="map" element={<Map></Map>}></Route>
        <Route path="convenient" element={<Convenient></Convenient>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;