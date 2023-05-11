/*global kakao*/
import React,{useEffect, useState} from "react";
import LocList from "../components/buildinginfo";

const { kakao } = window;
const loc = LocList();

function KakaoMap(props) {
    
    const [map,settingMap] = useState(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=b293485c020bc779186aa7fafcaf1dba&autoload=false';
        
        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById('map');
                const options = {
                    center: new window.kakao.maps.LatLng(loc[1].Lat, loc[1].Lng),
                    level: 3
                };
                const newMap = new window.kakao.maps.Map(container, options)
                settingMap(newMap);

                var markerPosition = new window.kakao.maps.LatLng(loc[0].Lat, loc[0].Lng);
                var marker = new window.kakao.maps.Marker({
                    position : markerPosition
                });

                marker.setMap(newMap);
            });
        };


        document.head.appendChild(script);
        return () => {
        document.head.removeChild(script);
    };
    }, []);

    const moveCenter = () => {
        if (map){
            const center = new window.kakao.maps.LatLng(loc[0].Lat, loc[0].Lng); // 새로운 중심 좌표 설정
            map.setCenter(center);
        }
    };
    if(props.page === "map"){
        return (
            <div>
                <div id="map" style={{ width: '100%', height: '400px' }}></div>
                <button onClick = {moveCenter}>중심으로 이동</button>
                <p>여긴 경로 페이지</p>
            </div>
            );
    }
    else if(props.page === "convenient"){
        return (
            <div>
                <div id="map" style={{ width: '100%', height: '400px' }}></div>
                <button onClick = {moveCenter}>중심으로 이동</button>
                <p>여긴 편의시설 페이지</p>
            </div>
            );
    }
    else{
        return (
            <div>
                <p>여긴 오류 페이지</p>
            </div>
            );
    }
}

export default KakaoMap;