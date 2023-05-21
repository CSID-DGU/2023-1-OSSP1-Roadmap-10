/*global kakao*/
import React, { useEffect, useState,useRef } from "react";
import LocList from "../components/buildinginfo";
import drawLine from "./Line";
import moveCenter from "./moveCenter";
import { hideMarker, showMarker } from "./hideMarker";
import selectBuilding from "../components/Dropdown"


const { kakao } = window;
const loc = LocList();

function KakaoMap(props) {

    const [map, settingMap] = useState(null);
    const [render1,setRender1] = useState(true);
    const [path, setPath] = useState([]);
    const [markers, setMarkers] = useState([])
    const [iW, addIW] = useState([])
    const [control, setControl] = useState(null)

    const [stateBtn, changeBtn] = useState(false)

    const [selectStart, setSelectStart] = useState(null)
    const [selectFinish, setSelectFinish] = useState(null)
    const [bothNode, setNode] = useState([null,null])//출발점과 도착점

    const [stopNode, setStopNode] = useState([])

    const addNewMarker = (newMarker) => {
        setMarkers((prevMarker) => [...prevMarker, newMarker])
    }
    const cngMarker = (newMarker) => {
        setMarkers(newMarker)
    }
    const addNewIW = (newInfoWindow) => {
        addIW((previW) => [...previW, newInfoWindow])
    }
    const addNewPath = (newPath) => {
        setPath((prevPath) => [...prevPath, newPath])
    }
    const clearPath = () => {
        setPath([]);
    }
    const clearStopNode = () => {
        setStopNode([])
    }
    const addBothNode = (newNode) => {
        setNode((prevNode) => [...prevNode, newNode])
    }
    const addStartNode = (newNode) => {
        setNode(bothNode[0] = newNode)
    }
    const addFinishNode = (newNode) => {
        setNode(bothNode[1] = newNode)
    }
    
    const clearAll = () => {
        setSelectStart(null)
        setSelectFinish(null)
        clearStopNode()
    }

    const deleteLine = () => {
        if (map) {
            if (path !== []) {
                path.map((path) => {
                    path.setMap(null)
                })
                clearPath()
            }
        }
    }
    
    const allDelete = () => {
        deleteLine()
        clearAll()
    }

    useEffect(() => {
        const markerArray = []
        const iWArray = []

        
        const script = document.createElement("script");
        script.async = true;
        script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=4df16387a395762838f3f668c6731805&autoload=false';


        script.onload = () => {
            window.kakao.maps.load(() => {
                if(render1){
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
        if(map){
        
            const deleteLine = () => {
                if (map) {
                    if (path !== []) {
                        path.map((path) => {
                            path.setMap(null)
                        })
                        clearPath()
                    }
                }
            }
            const startNode = (e) =>{
                addStartNode(e.target.value)
            }
            const finishNode = (e) =>{
                addFinishNode(e.target.value)
            }
            const makeLine = () => {
                if (map) {
                    console.log("??안됨" + bothNode.length)
                    addNewPath(drawLine(map,bothNode))
                }
            }
            const center = () => {
                if (map) {
                    moveCenter(map)
                }
            }
            const hide = ()=> {
                if (map && markers) {
                    console.log("실행됨?")
                    cngMarker(hideMarker(map, markers, iW, path))
                }
                else {
                    console.log("error")
                }
            }
            const show = () => {
                if (map && markers) {
                    cngMarker(showMarker(map, markers, path))
                }
                else {
                    console.log("error")
                }
            }

            const showLine = () => {
                console.log(bothNode)
            }
            
            var mapTypeControl = new window.kakao.maps.MapTypeControl();
            map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

            var zoomControl = new window.kakao.maps.ZoomControl();
            map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
            
            const newControl = document.createElement("div")
            const buttonShowMarker = document.createElement("button")
            buttonShowMarker.innerText = "마커 띄우기"
            buttonShowMarker.addEventListener("click", show)

            const buttonHideMarker = document.createElement("button")
            buttonHideMarker.innerText = "마커 숨기기"
            buttonHideMarker.addEventListener("click", hide)

            const selectboxStart = document.createElement("select");
            const startOptions = loc.map((building) => `<option key=${building.code} value=${building.id}>${building.id}</option>`);
            selectboxStart.innerHTML = `<option selected disabled>출발지 선택</option>${startOptions.join("")}`;
            selectboxStart.addEventListener("change", startNode);

            const selectboxFinish = document.createElement("select");
            const finishOptions = loc.map((building) => `<option key=${building.code} value=${building.id}>${building.id}</option>`);
            selectboxFinish.innerHTML = `<option selected disabled>도착지 선택</option>${finishOptions.join("")}`;
            selectboxFinish.addEventListener("change", finishNode);

            const buttonCenter = document.createElement("button")
            buttonCenter.innerText = "중심으로 이동"
            buttonCenter.addEventListener("click", center);

            const buttonMakeLine = document.createElement("button")
            buttonMakeLine.innerText = "경로 탐색"
            buttonMakeLine.addEventListener("click", makeLine)

            const buttonShowLine = document.createElement("button")
            buttonShowLine.innerText = "확인"
            buttonShowLine.addEventListener("click", showLine)

            newControl.appendChild(buttonShowMarker)
            newControl.appendChild(buttonHideMarker)
            newControl.appendChild(buttonCenter)
            newControl.appendChild(selectboxStart)
            newControl.appendChild(selectboxFinish)
            newControl.appendChild(buttonMakeLine)
            newControl.appendChild(buttonShowLine)
            map.addControl(newControl, window.kakao.maps.ControlPosition.TOPLEFT)
        }
    },[map])


    if (props.page === "map") {
        return (
            <div>
                <div>
                    <div id="map" style={{ width: '100%', height: '400px' }}></div>
                </div>
                <p> 출발지 : {selectStart} / 도착지 : {selectFinish}</p>
                <p> 경유지 : {stopNode}</p>
                <button disabled={stateBtn} onClick={deleteLine}>
                    선 지우기
                </button>
                <button disabled={stateBtn} onClick={allDelete}>
                    초기화
                </button>
            </div>
        )
    }
    else if (props.page === "convenient") {
        return (
            <div>
                <p>여긴 편의시설 페이지</p>
            </div>
        );
    }
    else {
        return (
            <div>
                <p>여긴 오류 페이지</p>
            </div>
        );
    }
}

export default KakaoMap;