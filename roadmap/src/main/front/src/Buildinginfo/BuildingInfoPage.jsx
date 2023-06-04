/*global kakao*/
import React, { useEffect, useState, useRef } from "react";
import axios from "axios"
import LocList from "../components/buildinginfo";
import drawLine from "../components/Line";
import moveCenter from "../components/moveCenter";
import { hideMarker, showMarker } from "../components/Marker";



const { kakao } = window;
const loc = LocList();

function BuildingInfoPage() {

    const [map, settingMap] = useState(null);
    const [render1, setRender1] = useState(true);
    const [markers, setMarkers] = useState([])
    const [iW, addIW] = useState([])
    const [path, setPath] = useState(null)
    const [selectStart, setSelectStart] = useState(null)
    const [selectFinish, setSelectFinish] = useState(null)
    const addNewMarker = (newMarker) => {
        setMarkers((prevMarker) => [...prevMarker, newMarker])
    }
    const addNewIW = (newInfoWindow) => {
        addIW((previW) => [...previW, newInfoWindow])
    }
    useEffect(() => {


        const script = document.createElement("script");
        script.async = true;
        script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=4df16387a395762838f3f668c6731805&autoload=false';


        script.onload = () => {
            window.kakao.maps.load(() => {
                if (render1) {
                    const container = document.getElementById('map');
                    const options = {
                        center: new window.kakao.maps.LatLng(loc[0].Lat, loc[0].Lng),
                        level: 3
                    };

                    const newMap = new window.kakao.maps.Map(container, options)
                    settingMap(newMap);

                    var mapTypeControl = new window.kakao.maps.MapTypeControl();

                    newMap.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

                    var zoomControl = new window.kakao.maps.ZoomControl();
                    newMap.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);


                    setRender1(false)

                }

            })
        };


        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, []);

    useEffect(()=>{
        if(map){
            const markerArray = []
            const iWArray = []
    
    
            loc.map((building) => {
                const markerPosition = new window.kakao.maps.LatLng(building.Lat, building.Lng);
                const newMarker = new window.kakao.maps.Marker({
                    position: markerPosition
                });
    
    
                newMarker.setMap(map);
    
                const newInfoWindow = new window.kakao.maps.CustomOverlay({
                    clickable:true,
                    map: map,
                    position: newMarker.getPosition(),
                    removable: true,
                })
    
                const contents =
                    `<div class="overlay-wrapper">
                        <div class="overlay-bar"><h>${building.id}</h><div class = "xmark"><i class="fa-solid fa-xmark" onClick = {${closeOverlay()}}></i></div></div>
                        <body>
                            <div class="overlay-img-wrapper"><img src ="ROADMAP_4.png"></img></div>
                            <div class="overlay-text-wrapper">
                                <p>편의시설: ${building.facilities}</p>
                                <p>학사운영실 위치/전화번호:</p>
                            </div>
                        </body>
                        <script>
                        </script>
                    </div>`;
    
                newInfoWindow.setMap(null)

                function closeOverlay(){
                    newInfoWindow.setMap(null)
                }
                newInfoWindow.setContent(contents)
    
                window.kakao.maps.event.addListener(newMarker, 'click', function () {
                    if (map) {
                        if (newInfoWindow.getMap() === null) {
                            newInfoWindow.setMap(map)
                        }
                        else {
                            newInfoWindow.setMap(null)
                        }
                    }
                })
    
    
                addNewMarker(newMarker);
                addNewIW(newInfoWindow);
                markerArray.push(newMarker)
                iWArray.push(newInfoWindow)
            })
        }
    },[map]);

    const deleteLine = () => {
        if (map) {
            if (path) {
                path.setMap(null)
            }
            setPath(0)
        }
    }

    function drawPath(nestedList) {
        if (map) {
            deleteLine()
            try {
                for (let i = 0; i < nestedList.length - 1; i++) {
                    const startLatLng = new window.kakao.maps.LatLng(
                        parseFloat(nestedList[i][0]),
                        parseFloat(nestedList[i][1])
                    );
                    const finishLatLng = new window.kakao.maps.LatLng(
                        parseFloat(nestedList[i + 1][0]),
                        parseFloat(nestedList[i + 1][1])
                    );
                    setPath(drawLine(map, startLatLng, finishLatLng));
                }
            } catch {
                console.log("drawPath's error")
            }
        }

    }

    return (
        <div className="map-wrapper">
            <span>
                <div id="map" className="map-style"></div>
            </span>
            <p> 출발지 : {selectStart} / 도착지 : {selectFinish}</p>
        </div>
    )

}

export default BuildingInfoPage;