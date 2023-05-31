/*global kakao*/
import React, { useEffect, useState, useRef } from "react";
import axios from "axios"
import LocList from "../data/buildinginfo";
import drawLine from "../components/Line";
import moveCenter from "../components/moveCenter";
import { hideMarker, showMarker } from "../components/Marker";

import selectBuilding from "../components/Dropdown"


const { kakao } = window;
const loc = LocList();

function KakaoMap() {

    const [map, settingMap] = useState(null);
    const [render1, setRender1] = useState(true);
    const [markers, setMarkers] = useState([])
    const [iW, addIW] = useState([])
    const [path, setPath] = useState(null)
    const [stateMarker, setStateMarker] = useState(true)
    const [buttonText, setButtonText] = useState("감추기")
    const changeStateMarker = () => {
        if (stateMarker) {
            setStateMarker(false)
            setButtonText("띄우기")
        } else {
            setStateMarker(true)
            setButtonText("감추기")
        }
    }
    const [selectStart, setSelectStart] = useState(null)
    const [selectFinish, setSelectFinish] = useState(null)
    const [bothNode, setNode] = useState([null, null])//출발점과 도착점
    const addNewMarker = (newMarker) => {
        setMarkers((prevMarker) => [...prevMarker, newMarker])
    }
    const cngMarker = (newMarker) => {
        setMarkers(newMarker)
    }
    const addNewIW = (newInfoWindow) => {
        addIW((previW) => [...previW, newInfoWindow])
    }
    const addStartNode = (newNode) => {
        setSelectStart(newNode)
        setNode([newNode, bothNode[1]])
    }
    const addFinishNode = (newNode) => {
        setSelectFinish(newNode)
        setNode([bothNode[0], newNode])
    }
    useEffect(() => {
        const markerArray = []
        const iWArray = []


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


                    loc.map((building) => {
                        const markerPosition = new window.kakao.maps.LatLng(building.Lat, building.Lng);
                        const newMarker = new window.kakao.maps.Marker({
                            position: markerPosition
                        });


                        newMarker.setMap(newMap);

                        const contents = document.createElement('div');

                        const text = document.createElement('text')
                        contents.textContent = (building.explain)
                        text.appendChild(contents)

                        const newInfoWindow = new window.kakao.maps.InfoWindow({
                            content: text,
                            removable: true
                        })

                        window.kakao.maps.event.addListener(newMarker, 'click', function () {
                            newInfoWindow.open(newMap, newMarker)
                        })

                        addNewMarker(newMarker);
                        addNewIW(newInfoWindow);
                        markerArray.push(newMarker)
                        iWArray.push(newInfoWindow)
                    })

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
    const deleteLine = () => {
        if (map) {
            if (path) {
                path.setMap(null)
            }
            setPath()
        }
    }
    const startNode = (e) => {
        addStartNode(e.target.value)
    }
    const finishNode = (e) => {
        addFinishNode(e.target.value)
    }
    const makeLine = () => {
        if (map) {
            deleteLine()
            try {
                setPath(drawLine(map, bothNode))
            } catch {
                console.log("drawline's error")
            }
        }
    }
    const center = () => {
        if (map) {
            moveCenter(map)
        }
    }
    useEffect(() => {
        if (map && markers) {
            try {
                if (stateMarker) {
                    cngMarker(showMarker(map, markers))
                    path.setMap(map)
                } else {
                    cngMarker(hideMarker(map, markers, iW))
                    path.setMap(null)
                }
            } catch {
                console.log("error?")
            }
        }

    }, [stateMarker])
    const check = () => {
        console.log(bothNode)
        console.log(path)
    }

    return (
        <div className="map-wrapper">
            <div className="controller-wrapper">
                <select className="box-style" onChange={startNode}>
                    <option selected disabled>출발지 선택</option>
                    {loc.map((building) => <option key={building.code} value={building.id}>{building.id}</option>)}
                </select>
                <select className="box-style" onChange={finishNode}>
                    <option selected disabled>도착지 선택</option>
                    {loc.map((building) => <option key={building.code} value={building.id}>{building.id}</option>)}
                </select>
                <button className="button-style" onClick={makeLine}>경로 탐색</button>
            </div>

            <span>
                <div id="map" className="map-style"></div>
            </span>
            <p> 출발지 : {selectStart} / 도착지 : {selectFinish}</p>
        </div>
    )

}

export default KakaoMap;