/*global kakao*/
import React, { useEffect, useState,useRef } from "react";
import LocList from "../components/buildinginfo";
import drawLine from "./Line";
import moveCenter from "./moveCenter";
import { hideMarker, showMarker } from "./hideMarker";
import "./controlStyle.css"
import selectBuilding from "../components/Dropdown"


const { kakao } = window;
const loc = LocList();

function KakaoMap(props) {

    const [map, settingMap] = useState(null);
    const [render1,setRender1] = useState(true);
    const [markers, setMarkers] = useState([])
    const [iW, addIW] = useState([])

    const [selectStart, setSelectStart] = useState(null)
    const [selectFinish, setSelectFinish] = useState(null)
    const [bothNode, setNode] = useState([null,null])//출발점과 도착점

    const [stopNodes, setStopNode] = useState([])
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
        setNode(bothNode[0] = newNode)
    }
    const addFinishNode = (newNode) => {
        setSelectFinish(newNode)
        setNode(bothNode[1] = newNode)
    }
    const addStopNode = (newNode) => {
        setStopNode(stopNodes.push(newNode))
    }
    const deleteStopNode = () => {
        setStopNode(stopNodes.splice(stopNodes.length - 1,1))
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
            let currentPath = [

            ]
            const deleteLine = () => {
                if (map) {
                    if (currentPath !== []) {
                        currentPath.map((path) => {
                            path.setMap(null)
                        })
                        currentPath = []
                    }
                }
            }
            const startNode = (e) =>{
                addStartNode(e.target.value)
            }
            const finishNode = (e) =>{
                addFinishNode(e.target.value)
            }
            const stopNode = (e) =>{
                if(e.target.value === "경유지 선택"){
                    console.log("value is error")
                }else{
                    console.log("실행됨")
                    addStopNode(e.target.value)
                }
            }
            const deleteStop = () =>{
                deleteStopNode()
            }
            const makeLine = () => {
                if (map) {
                    deleteLine()
                    try {
                        currentPath.push((drawLine(map, bothNode, stopNodes)))
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
            const hide = ()=> {
                if (map && markers) {
                    console.log("실행됨?")
                    try {
                        cngMarker(hideMarker(map, markers, iW, currentPath))
                    } catch {
                        console.log("hidemarker's error")
                    }
                }
                else {
                    console.log("error")
                }
            }
            const show = () => {
                if (map && markers) {
                    cngMarker(showMarker(map, markers, currentPath))
                }
                else {
                    console.log("error")
                }
            }
            const check = () =>{
                console.log(currentPath)
                console.log(stopNodes)
            }


            var mapTypeControl = new window.kakao.maps.MapTypeControl();
            map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

            var zoomControl = new window.kakao.maps.ZoomControl();
            map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
            
            const topleftControl = document.createElement("div")
            topleftControl.classList.add("topleft-control");

            const bottomleftControl = document.createElement("div")
            bottomleftControl.classList.add("bottomleft-control");

            const buttonShowMarker = document.createElement("show")
            buttonShowMarker.innerHTML = `<button>띄우기</button>`
            buttonShowMarker.classList.add("button-text")
            buttonShowMarker.addEventListener("click", show)

            const buttonHideMarker = document.createElement("hide")
            buttonHideMarker.innerHTML = `<button>숨기기</button>`
            buttonHideMarker.classList.add("button-text")
            buttonHideMarker.addEventListener("click", hide)

            const buttonCenter = document.createElement("centers")
            buttonCenter.innerHTML = `<button>중심</button>`
            buttonCenter.classList.add("button-text")
            buttonCenter.addEventListener("click", center);

            const selectboxStart = document.createElement("select");
            const startOptions = loc.map((building) => `<option key=${building.code} value=${building.id}>${building.id}</option>`);
            selectboxStart.innerHTML = `<option selected disabled>출발지 선택</option>${startOptions.join("")}`;
            selectboxStart.addEventListener("change", startNode);

            const selectboxFinish = document.createElement("select");
            const finishOptions = loc.map((building) => `<option key=${building.code} value=${building.id}>${building.id}</option>`);
            selectboxFinish.innerHTML = `<option selected disabled>도착지 선택</option>${finishOptions.join("")}`;
            selectboxFinish.addEventListener("change", finishNode);

            const selectboxStop = document.createElement("select");
            const stopOptions = loc.map((building) => `<option key=${building.code} value=${building.id}>${building.id}</option>`);
            selectboxStop.innerHTML = `<option selected disabled>경유지 선택</option>${stopOptions.join("")}`;
            selectboxStop.addEventListener("change", stopNode);

            const buttonMakeLine = document.createElement("button")
            buttonMakeLine.innerText = "경로 탐색"
            buttonMakeLine.classList.add("button-text")
            buttonMakeLine.addEventListener("click", makeLine)
            
            const buttonDeleteStop = document.createElement("button")
            buttonDeleteStop.innerText = "경유지 삭제"
            buttonDeleteStop.classList.add("button-text")
            buttonDeleteStop.addEventListener("click", deleteStop)

            const buttonCheck = document.createElement("button")
            buttonCheck.innerText = "확인"
            buttonCheck.classList.add("button-text")
            buttonCheck.addEventListener("click", check)


            topleftControl.appendChild(buttonShowMarker)
            topleftControl.appendChild(buttonHideMarker)
            topleftControl.appendChild(buttonCenter)

            bottomleftControl.appendChild(selectboxStart)
            bottomleftControl.appendChild(selectboxFinish)
            bottomleftControl.appendChild(selectboxStop)
            bottomleftControl.appendChild(buttonMakeLine)
            bottomleftControl.appendChild(buttonDeleteStop)
            bottomleftControl.appendChild(buttonCheck)
            
            

            map.addControl(topleftControl, window.kakao.maps.ControlPosition.TOPLEFT)
            map.addControl(bottomleftControl, window.kakao.maps.ControlPosition.BOTTOMLEFT)

        }
    },[map])


    if (props.page === "map") {
        return (
            <div>
                <div>
                    <div id="map" style={{ width: '100%', height: '400px' }}></div>
                </div>
                <p> 출발지 : {selectStart} / 도착지 : {selectFinish}</p>
                <p> 경유지 : {stopNodes.length}</p>
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