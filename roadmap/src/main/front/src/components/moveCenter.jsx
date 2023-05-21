import LocList from "./buildinginfo";

const loc = LocList();

const moveCenter = (map) => {
    if (map){
        const center = new window.kakao.maps.LatLng(loc[0].Lat, loc[0].Lng); // 새로운 중심 좌표 설정
        map.setCenter(center);
    }
    else{
        console.log("map을 못 읽음 Center");
    }
};

export default moveCenter