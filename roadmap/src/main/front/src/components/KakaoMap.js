/*global kakao*/
import React,{useEffect} from "react";

const { kakao } = window;

function KakaoMap() {

    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=2c10a656211dc41838c73115bb1c292c&autoload=false';
        
        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById('map');
                const options = {
                    center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                    level: 3
                };
                const map = new window.kakao.maps.Map(container, options);
            });
        };
        document.head.appendChild(script);
        return () => {
      // 컴포넌트 언마운트 시에 스크립트 제거
      document.head.removeChild(script);
    };
    }, []);

    return (
        // 맵 컴포넌트의 JSX 반환
        <div id="map" style={{ width: '100%', height: '400px' }}></div>
      );
}

export default KakaoMap;