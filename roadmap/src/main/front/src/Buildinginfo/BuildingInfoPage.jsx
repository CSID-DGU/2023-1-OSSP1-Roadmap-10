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
    const [test, Test] = useState(true)
    const [iW, addIW] = useState([])


    const addNewMarker = (newMarker) => {
        setMarkers((prevMarker) => [...prevMarker, newMarker])
    }
    const addNewIW = (newInfoWindow) => {
        addIW((previW) => [...previW, newInfoWindow])
    }

    function settest() {
        if (map) {
            if (test) {
                Test(false)
            }
            else {
                Test(true)
            }
            console.log("실험.." + test)
        }

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


    useEffect(() => {
        if (map) {
            const markerArray = []
            const iWArray = []



            loc.map((building) => {
                const markerPosition = new window.kakao.maps.LatLng(building.Lat, building.Lng);
                const newMarker = new window.kakao.maps.Marker({
                    position: markerPosition
                });


                newMarker.setMap(map);

                addNewMarker(newMarker);
                markerArray.push(newMarker)

                const newInfoWindow = new window.kakao.maps.CustomOverlay({
                    clickable: true,
                    map: map,
                    position: newMarker.getPosition(),
                    removable: true,
                })

                const contents =
                    `<div class="overlay-wrapper">
                        <div class="overlay-bar"><h>${building.id}</h><div class = "xmark"><i class="fa-solid fa-xmark"}></i></div></div>
                        <body class = "overlay-content-wrapper">
                            <div class= "overlay-img-wrapper"><i class="fa-solid fa-xmark"></i></img></div>
                            <div class="overlay-text-wrapper">
                                <p>편의시설: ${building.facilities}</p>
                                <p>학사운영실 위치/전화번호:</p>
                                <button id = 'closeButton'>HOME</button>
                            </div>
                        </body>
                    </div>`;


                function closeOverlay() {
                    if (map) {
                        if (newInfoWindow.getMap() === null) {
                            newInfoWindow.setMap(map, newMarker)
                        }
                        else {
                            newInfoWindow.setMap(null)
                        }
                    }
                }

                newInfoWindow.setContent(contents)


                

                newInfoWindow.setMap(map)




                window.kakao.maps.event.addListener(newMarker, 'click', closeOverlay)

                addNewIW(newInfoWindow);
                iWArray.push(newInfoWindow)
            })
        }
    }, [map]);

    let i = 0;

    useEffect(() => {
        if (map) {
            iW.map(info => {
                info.setMap(null)
                
                console.log(i);
                
                i++;
            })
        }
    }, [iW])




    return (
        <div className="map-wrapper">
            <span>
                <div id="map" className="map-style"></div>
            </span>
        </div>
    )

}

export default BuildingInfoPage;