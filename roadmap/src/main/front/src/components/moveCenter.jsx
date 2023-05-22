import LocList from "./buildinginfo";

const loc = LocList()

const moveCenter = (map) =>{
    if(map){
        map.setCenter(new window.kakao.maps.LatLng(loc[0].Lat, loc[0].Lng));
    }
}
export default moveCenter