/*global kakao*/
import React,{useEffect, useState} from "react";
import LocList from "../components/buildinginfo";
import selectBuilding from "../components/Dropdown"


const { kakao } = window;
const loc = LocList();


function KakaoMap(props) {

    const [map,settingMap] = useState(null);
    const [line, settingLine] = useState(null);
    const [markers,addMarkers] = useState([])
    const [iW,addIW] = useState([])
    const [nowLoc,setLoc] = useState({
        Lat : 0,
        Lng : 0
    });
    const addNewLoc = (Lat,Lng) => {
        setLoc({
            Lat : Lat,
            Lng : Lng
        })
    }
    const addNewMarker = (newMarker) =>{
        addMarkers((prevMarker) => [...prevMarker, newMarker])
    }
    const addNewIW = (newInfoWindow) =>{
        addIW((previW) => [...previW, newInfoWindow])
    }

    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=5ce648fa9f3da578c51590ab2e03f17b&autoload=false';

        
        script.onload = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById('map');
                const options = {
                    center: new window.kakao.maps.LatLng(loc[1].Lat, loc[1].Lng),
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
                contents.textContent = '여기는' + JSON.stringify(building.id)

                container.appendChild(contents)

                const newInfoWindow = new window.kakao.maps.InfoWindow({
                    content : container,
                    removable : true
                })

                window.kakao.maps.event.addListener(newMarker, 'click', function(){
                    newInfoWindow.open(newMap,newMarker)
                    addNewLoc(building.Lat,building.Lng);
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

    const moveCenter = () => {
        if (map){
            const center = new window.kakao.maps.LatLng(loc[0].Lat, loc[0].Lng); // 새로운 중심 좌표 설정
            map.setCenter(center);
        }
        else{
            console.log("map을 못 읽음 Center");
        }
    };

    const makeLine = () => {
        if(map){
            if(line === null){
                const exPath = []
            loc.map((building) => {
                exPath.push(new window.kakao.maps.LatLng(building.Lat,building.Lng))
            })
            const newLine = new window.kakao.maps.Polyline({
                path: exPath,
                strokeWeight: 5,
                strokeColor: '#FFAE00',
                strokeOpacity: 0.7, 
                strokeStyle: 'solid'
            })
            newLine.setMap(map);
            settingLine(newLine);
            console.log(exPath);
            }
            else{
                line.setMap(map)
                console.log("이미 있는 것!")
            }
        }
    }
    const hideLine = () =>{
        if(map){
            line.setMap(null)
        }
    }
    const showMarker = () =>{
        if(map){
            console.log(markers.length)
            markers.map((marker) => {
                marker.setMap(map)
                console.log("마커 띄우기")/*숨겼다가 띄우면 지도가 파래지면서 오류 발생함*/
            })
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
        }
    }
    if(props.page === "map"){
        return (
            <div>
                <div id="map" style={{ width: '100%', height: '400px' }}></div>
                <button onClick = {moveCenter}>중심으로 이동</button>
                <button onClick = {makeLine}>선 만들기</button>
                <button onClick = {hideLine}>선 지우기</button>
                <button onClick = {showMarker}>마커 띄우기</button>
                <button onClick = {hideMarker}>마커 숨기기</button>
                <select>
                    {loc.map((building) => {
                    return(
                    <option key = {building.code} value = {building.id}>{building.id}</option>
                    )})}
                </select>
                {loc.map((building) =>{
                    return(
                    <li>{building.Lat},{building.Lng}</li>
                    )
                })}
                <p>여긴 경로 페이지</p>
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