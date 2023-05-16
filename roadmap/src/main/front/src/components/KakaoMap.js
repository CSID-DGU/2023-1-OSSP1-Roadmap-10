/*global kakao*/
import React,{useEffect, useState} from "react";
import LocList from "../components/buildinginfo";
import selectBuilding from "../components/Dropdown"


const { kakao } = window;
const loc = LocList();


function KakaoMap(props) {

    const [map,settingMap] = useState(null);
    const [path, setPath] = useState([]);
    const [markers,addMarkers] = useState([])
    const [iW,addIW] = useState([])
    const [stateBtn,changeBtn] = useState(false)

    const [selectStart, setSelectStart] = useState(null)
    const [selectFinish, setSelectFinish] = useState(null)
    const [bothNode, setBothNode] = useState([])//출발점과 도착점

    const [selectStop,setSelectStop] = useState(null)
    const [stopNode,setStopNode] = useState([])

    const addNewMarker = (newMarker) =>{
        addMarkers((prevMarker) => [...prevMarker, newMarker])
    }
    const addNewIW = (newInfoWindow) =>{
        addIW((previW) => [...previW, newInfoWindow])
    }
    const addNewNode = (newNode) => {
        setBothNode((prevNode) => [...prevNode, newNode])
    }
    const clearNode = () => {
        setBothNode([])
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
        script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=5ce648fa9f3da578c51590ab2e03f17b&autoload=false';

        
        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById('map');
                const options = {
                    center: new window.kakao.maps.LatLng(loc[0].Lat, loc[0].Lng),
                    level: 3
                };
                const newMap = new window.kakao.maps.Map(container, options)
                settingMap(newMap);

                loc.map((building) =>  {
                    const markerPosition = new window.kakao.maps.LatLng(building.Lat, building.Lng);
                    const newMarker = new window.kakao.maps.Marker({
                    position : markerPosition
                });

                
                newMarker.setMap(newMap);

                const contents = document.createElement('div');
                
                const container = document.createElement('container')
                contents.textContent =(building.explain)
                /*const button = document.createElement('div')
                button.innerHTML = ('<div><button onClick = {startNode}>출발</button><button onClick = {finishNode}>도착</button></div>')

                contents.appendChild(button)*/
                container.appendChild(contents)

                const newInfoWindow = new window.kakao.maps.InfoWindow({
                    content : container,
                    removable : true
                })

                window.kakao.maps.event.addListener(newMarker, 'click', function(){
                    newInfoWindow.open(newMap,newMarker)
                })
                addNewMarker(newMarker);
                addNewIW(newInfoWindow);

                })
            });
        };


        document.head.appendChild(script);
        return () => {
        document.head.removeChild(script);
    };
    }, []);

    useEffect(() => {
        if(selectFinish !== null && selectStart !== null){
            if(bothNode.length !== 0){
                clearNode()
            }
            /*const start = loc.find((building) => building.id === selectStart)
            const finish = loc.find((building) => building.id === selectFinish)*/

            addNewNode(loc.find((building) => building.id === selectStart));
            addNewNode(loc.find((building) => building.id === selectFinish));

            console.log(selectStart)
            console.log(selectFinish)
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


    const moveCenter = () => {
        if (map){
            const center = new window.kakao.maps.LatLng(loc[0].Lat, loc[0].Lng); // 새로운 중심 좌표 설정
            map.setCenter(center);
        }
        else{
            console.log("map을 못 읽음 Center");
        }
    };
    
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
    const showMarker = () =>{
        if(map){
            console.log(markers.length)
            console.log(markers)
            markers.map((marker) => {
                marker.setMap(map)
                console.log("마커 띄우기")
            })
            if(path !== []){
                path.map((path) => {
                    path.setMap(map)
                })
            }
        }
    }

    const hideMarker = () =>{
        if(map){
            console.log(markers.length)
            
            markers.map((marker) => {
                marker.setMap(null)
                console.log("마커 숨기기")
            })
            iW.map((infowindow) => {
                infowindow.close()
            })
            if(path !== []){
                path.map((path) => {
                    path.setMap(null)
                })
            }
        }
    }

    const makeLine = () =>{
        if(map){
            deleteLine();

            const [first, last] = bothNode

            const pathNode = []
            pathNode.push(new window.kakao.maps.LatLng(first.Lat, first.Lng))
            stopNode.map((node) => {
                const newPath = loc.find((building) => building.id === node)
                pathNode.push(new window.kakao.maps.LatLng(newPath.Lat,newPath.Lng))
            })
            pathNode.push(new window.kakao.maps.LatLng(last.Lat, last.Lng))
            /*bothNode.map((building) => {
                pathNode.push(new window.kakao.maps.LatLng(building.Lat, building.Lng))
            })*/
            
        
            const newPath = new window.kakao.maps.Polyline({
                path: pathNode,
                strokeWeight: 5, 
                strokeColor: '#FFAE00', 
                strokeOpacity: 1, 
                strokeStyle: 'solid' 
            })
            newPath.setMap(map)
            addNewPath(newPath)
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
                <div id="map" style={{ width: '100%', height: '400px' }}></div>
                <button onClick = {moveCenter}>중심으로 이동</button>
                <button onClick = {showMarker}>마커 띄우기</button>
                <button onClick = {hideMarker}>마커 숨기기</button>
                </div>
                <div>
                <span>출발지 : </span>
                <select value = {selectStart} onChange ={startNode}>
                    <option key = 'default' value = {null} disabled selected>=====</option>
                    {loc.map((building) => {
                    return(
                    <option key = {building.code} value = {building.id}>{building.id}</option>
                    )})}
                </select>
                <span> 도착지 : </span>
                <select value = {selectFinish} onChange ={finishNode}>
                    <option key = 'default' value = {null} disabled = {true} selected>=====</option>
                    {loc.map((building) => {
                    return(
                    <option key = {building.code} value = {building.id}>{building.id}</option>
                    )})}
                </select>
                <span> 경유지 : </span>
                <select value = {selectStop} onChange ={stopOverNode} disabled = {stateBtn}>
                    <option key = 'default' value = {null} disabled = {true} selected>=====</option>
                    {loc.map((building) => {
                    return(
                    <option key = {building.code} value = {building.id}>{building.id}</option>
                    )})}
                </select>
                <button onClick={addStopNode} disabled = {stateBtn}>
                    추가
                </button>
                <button disabled = {stateBtn} onClick = {clearStopNode}>
                    경유지 제거
                </button>
                <p> 출발지 : {selectStart} / 도착지 : {selectFinish}</p>
                <p> 경유지 : {stopNode}</p>
                <button disabled = {stateBtn} onClick = {makeLine}>
                    경로 탐색
                </button>
                <button disabled = {stateBtn} onClick = {deleteLine}>
                    선 지우기
                </button>
                <button disabled = {stateBtn} onClick = {allDelete}>
                    초기화
                </button>
                
                </div>
            </div>
        )
    }
    else if(props.page === "convenient"){
        return (
            <div>
                <div id="map" style={{ width: '100%', height: '400px' }}></div>
                <button onClick = {moveCenter}>중심으로 이동</button>
                <button onClick = {makeLine}>선 만들기</button>
                <select>{loc.map((building) => {
                    return(
                    <option key = {building.code} value = {building.id}>{building.id}</option>
                    )})}</select>{loc.map((building) =>{
                    return(
                    <li>{building.Lat},{building.Lng}</li>
                    )
                })}
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