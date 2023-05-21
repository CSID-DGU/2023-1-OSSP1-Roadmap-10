/*global kakao*/
import React,{useEffect, useState} from "react";
import LocList from "../components/buildinginfo";
import drawLine from "./Line";
import moveCenter from "./moveCenter";
import {hideMarker, showMarker} from "./hideMarker";
import selectBuilding from "../components/Dropdown"


const { kakao } = window;
const loc = LocList();

function KakaoMap(props) {

    const [map,settingMap] = useState(null);
    const [path, setPath] = useState([]);
    const [markers,setMarkers] = useState([])
    const [iW,addIW] = useState([])
    const [stateBtn,changeBtn] = useState(false)

    const [selectStart, setSelectStart] = useState(null)
    const [selectFinish, setSelectFinish] = useState(null)
    const [bothNode, setNode] = useState([null,null])//출발점과 도착점

    const [selectStop,setSelectStop] = useState(null)
    const [stopNode,setStopNode] = useState([])

    const addNewMarker = (newMarker) =>{
        setMarkers((prevMarker) => [...prevMarker, newMarker])
    }
    const cngMarker = (newMarker) =>  {
        setMarkers(newMarker)
    }
    const addNewIW = (newInfoWindow) =>{
        addIW((previW) => [...previW, newInfoWindow])
    }
    const addNewFinishNode = (newNode) => {
        setNode([bothNode[0],newNode])
    }
    const addNewStartNode = (newNode) => {
        setNode([newNode,bothNode[1]])
    }
    const clearNode = () => {
        setNode([null,null])
    }
    const addNewPath = (newPath) =>{
        setPath((prevPath) => [...prevPath,newPath])
    }
    const clearPath = () => {
        setPath([]);
    }
    const startNode = (e) =>{
        setSelectStart(e.target.value)
    }
    const stopOverNode = (e) =>{
        setSelectStop(e.target.value)
    }
    const addStopNode = () =>{
        if(stopNode.length !== 0){
            stopNode.map((node) => {
                if(selectStop === node){
                    console.log("겹칩니다")
                }
                else{
                    setStopNode((prevStopNode) => [...prevStopNode,selectStop])
                }
            })
        }else{
            setStopNode((prevStopNode) => [...prevStopNode,selectStop])
        }
    }
    const clearStopNode = () =>{
        setStopNode([])
    }
    const finishNode = (e) =>{
        setSelectFinish(e.target.value)
    }
    const clearAll = () =>{
        setSelectStart(null)
        setSelectFinish(null)
        clearStopNode()
    }
    const setBtn = (boolean) => {
        changeBtn(boolean)
    }

    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=4df16387a395762838f3f668c6731805&autoload=false';

        
        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById('map');
                const options = {
                    center: new window.kakao.maps.LatLng(loc[0].Lat, loc[0].Lng),
                    level: 3
                };
                const newMap = new window.kakao.maps.Map(container, options)
                settingMap(newMap);
                
                const markerArray = [];
                const iWArray = [];
                if(markers.length !== 0 && iW.length !== 0){
                    markers.map((marker) => {
                        marker.setMap(newMap)
                        markerArray.push(marker)
                    })
                }else{

                }
                loc.map((building) =>  {
                    const markerPosition = new window.kakao.maps.LatLng(building.Lat, building.Lng);
                    const newMarker = new window.kakao.maps.Marker({
                    position : markerPosition
                });

                
                newMarker.setMap(newMap);

                const contents = document.createElement('div');
                
                const text = document.createElement('text')
                contents.textContent =(building.explain)
                /*const button = document.createElement('div')
                button.innerHTML = ('<div><button onClick = {startNode}>출발</button><button onClick = {finishNode}>도착</button></div>')

                contents.appendChild(button)*/
                text.appendChild(contents)

                const newInfoWindow = new window.kakao.maps.InfoWindow({
                    content : text,
                    removable : true
                })

                window.kakao.maps.event.addListener(newMarker, 'click', function(){
                    newInfoWindow.open(newMap,newMarker)
                })
                
                addNewMarker(newMarker);
                addNewIW(newInfoWindow);
                markerArray.push(newMarker);
                iWArray.push(newInfoWindow);
                })

                var mapTypeControl = new window.kakao.maps.MapTypeControl()
                newMap.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

                const addStartNode = (e) => {
                    startNode(e)
                }
                const addFinishNode = (e) => {
                    finishNode(e)
                }

                const deleteLine = () =>{
                    if(newMap){
                        if(path !== []){
                            path.map((path) => {
                                path.setMap(null)
                            })
                            clearPath()
                        }
                    }
                }
                const makeLine = () =>{
                    if(newMap){
                        deleteLine()
                        addNewPath(drawLine(newMap))
                    }
                }
                const center = () => {
                    if(newMap){
                        moveCenter(newMap)
                    }
                }
                const hide = () =>{
                    if(newMap && markers){
                        cngMarker(hideMarker(newMap, markerArray, iWArray,path))
                    }
                    else{
                        console.log("error")
                    }
                }
                const show = () => {
                    if(newMap && markers){
                        cngMarker(showMarker(newMap, markerArray, path))
                    }
                    else{
                        console.log("error")
                    }
                }
                const control = document.createElement("div")

                const buttonShowMarker = document.createElement("button")
                buttonShowMarker.innerText = "마커 띄우기"
                buttonShowMarker.addEventListener("click",show)

                const buttonHideMarker = document.createElement("button")
                buttonHideMarker.innerText = "마커 숨기기"
                buttonHideMarker.addEventListener("click",hide)

                const selectboxStart = document.createElement("select")
                selectboxStart.innerHTML = loc.map((building) => `<option key = ${building.code} value = ${building.id}>${building.id}</option>`).join("")
                selectboxStart.addEventListener("change",addStartNode)

                const selectboxFinish = document.createElement("select")
                selectboxFinish.innerHTML = loc.map((building) => `<option key = ${building.code} value = ${building.id}>${building.id}</option>`).join("")
                selectboxFinish.addEventListener("change", addFinishNode)

                const buttonCenter = document.createElement("button")
                buttonCenter.innerText = "중심으로 이동"
                buttonCenter.addEventListener("click",center);

                const buttonMakeLine = document.createElement("button")
                buttonMakeLine.innerText = "경로 탐색"
                buttonMakeLine.addEventListener("click",makeLine)

                control.appendChild(buttonShowMarker)
                control.appendChild(buttonHideMarker)
                control.appendChild(buttonCenter)
                control.appendChild(selectboxStart)
                control.appendChild(selectboxFinish)
                control.appendChild(buttonMakeLine)

                newMap.addControl(control, window.kakao.maps.ControlPosition.TOPLEFT)
            });
        };


        document.head.appendChild(script);
        return () => {
        document.head.removeChild(script);
    };
    }, []);

    useEffect(() => {
        if(selectFinish&& selectStart){
            if(bothNode.length !== 0){
                clearNode()
            }

            addNewStartNode(loc.find((building) => building.id === selectStart));
            addNewFinishNode(loc.find((building) => building.id === selectFinish));
            console.log(bothNode)

            setBtn(false)
        }else{
            setBtn(true)
            if(bothNode.length !== 0){
                deleteLine()
                clearNode()
                clearStopNode()
            }
        }
    },[selectStart,selectFinish])

    
    
    const deleteLine = () =>{
        if(map){
            if(path !== []){
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

    if(props.page === "map"){
        return (
            <div>
                <div>
                <div id="map" style={{ width: '100%', height: '400px' }}>
                </div>
                </div>
                <p> 출발지 : {selectStart} / 도착지 : {selectFinish}</p>
                <p> 경유지 : {stopNode}</p>
                <button disabled = {stateBtn} onClick = {deleteLine}>
                    선 지우기
                </button>
                <button disabled = {stateBtn} onClick = {allDelete}>
                    초기화
                </button>
            </div>
        )
    }
    else if(props.page === "convenient"){
        return (
            <div>
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