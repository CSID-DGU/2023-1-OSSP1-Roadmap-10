import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../pages/Mainpage.jsx";
import Map from "../pages/Map.jsx";
import Convenient from "../pages/Convenient.jsx";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Navigate to="/mainPage" />}></Route>
        <Route path="mainPage" element={<MainPage></MainPage>}></Route>
        <Route path="map" element={<Map></Map>} />
        <Route path="convenient" element={<Convenient></Convenient>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;