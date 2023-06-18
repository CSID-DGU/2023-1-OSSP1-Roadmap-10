/*global kakao*/
import React, { useEffect, useState} from "react";
import axios from "axios"
import LocList from "../components/buildinginfo";
import drawLine from "../components/Line";
import {showMarker } from "../components/Marker";



const { kakao } = window;
const loc = LocList();

function KakaoMap() {

    const storedData = localStorage.getItem('myData');
    const [map, settingMap] = useState(null);
    const [markers, setMarkers] = useState([])
    const [iW, addIW] = useState([])
    const [path, setPath] = useState(null)
    const [stateMarker, setStateMarker] = useState(true)
    const [start, SetStart] = useState()
    const [finish, SetFinish] = useState(storedData)
    const [shortestPath, setShortestPath] = useState([])
    const [dLatLng, setDLatLng] = useState([])
    const [selectStart, setSelectStart] = useState(null)
    const [selectFinish, setSelectFinish] = useState(null)
    const [searchClicked, setSearchClicked] = useState(false)
    const [image,setImage] = useState([])




    const cngMarker = (newMarker) => {
        setMarkers(newMarker)
    }

    useEffect(() => {
        if (!map) {
            const script = document.createElement("script");
            script.async = true;
            script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=4df16387a395762838f3f668c6731805&autoload=false";

            script.onload = () => {
                window.kakao.maps.load(() => {
                    const container = document.getElementById("map");
                    const options = {
                        center: new window.kakao.maps.LatLng(loc[0].Lat, loc[0].Lng),
                        level: 3
                    };

                    console.log(storedData);

                    const newMap = new window.kakao.maps.Map(container, options);
                    settingMap(newMap);

                    const mapTypeControl = new window.kakao.maps.MapTypeControl();
                    newMap.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

                    const zoomControl = new window.kakao.maps.ZoomControl();
                    newMap.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
                });
            };

            document.head.appendChild(script);
            return () => {
                document.head.removeChild(script);
            };
        } else if (markers && stateMarker) {
            try {
                cngMarker(showMarker(map, markers, iW));
            } catch (error) {
                console.log("Error:", error);
            }
        } else if (map && path) {
            path.forEach((line) => line.setMap(null));
            setPath([]);
        }

        /*if (searchClicked) {
            if (map && markers && dLatLng && shortestPath) {
                console.log("dLatLng updated:", dLatLng);
                console.log("shortestPath updated:", shortestPath);
                drawPath(dLatLng);
                createMarker(dLatLng, shortestPath);
            }

            setSearchClicked(false); // Reset the searchClicked state variable
        }*/
    }, [map, markers, stateMarker, dLatLng, shortestPath,path,iW]);

    useEffect(() => {
        if(map) {
            if (searchClicked) {
                if (map && markers && dLatLng && shortestPath) {
                    console.log("dLatLng updated:", dLatLng);
                    console.log("shortestPath updated:", shortestPath);
                    drawPath(dLatLng);
                    createMarker(dLatLng, shortestPath);
                }

                setSearchClicked(false); // Reset the searchClicked state variable
            }
        }
    },[markers,stateMarker,dLatLng,shortestPath,path,iW])

    const deleteLine = () => {
        if (map && path) {
            path.forEach((line) => line.setMap(null)); // Remove each line from the map
        }
    };

    const deleteMarker = () => {
        if (markers && markers.length > 0) {
            markers.forEach((marker) => {marker.setMap(null)});// Remove each marker from the map
            iW.forEach((iW) => {iW.setMap(null)});// Remove each infoWindow from the map
            addIW([]);// Clear the iW array
            setMarkers([]); // Clear the markers array
        }
    };

    const getImgAdd = (imgName) => {
        try {
            const imgAdd = require(`../images/${imgName}`);
            return imgAdd;
        } catch (error) {
            return null;
        }
    };
    function imgChk(node){
        const code = node + ".jpg";
        try {
            const imgAdd = getImgAdd(code);
            if(imgAdd !== null){
                const img = new Image();
                img.src = imgAdd;
                console.log(imgAdd + " 여기 마커 있어요.");
                return true;
            }
            else {
                return false;
            }
        } catch (error) {
            console.error();

        }
    }

    function createMarker(dLatLng, shortestPath) {
        if (map) {
            try {
                deleteMarker(); // Delete previously existing markers
                const newMarkers = [];
                const newiW = [];
                for (let i = 0; i < dLatLng.length; i++) {

                    const node = shortestPath[i];

                    if(i===0 || i === dLatLng.length - 1){
                        const markerPosition = new window.kakao.maps.LatLng(
                            parseFloat(dLatLng[i][0]),
                            parseFloat(dLatLng[i][1])
                        );
                        const newMarker = new window.kakao.maps.Marker({
                            position: markerPosition,
                        });
                        newMarker.setMap(map);
                        newMarkers.push(newMarker);
                    }

                    if(imgChk(node)===true){
                        console.log("exist");
                        const camera = "camera.png";
                        const imgCode = node + ".jpg"
                        const infoImg = getImgAdd(imgCode)

                        const imageSrc = getImgAdd(camera), // 마커이미지의 주소입니다
                            imageSize = new kakao.maps.Size(32, 35), // 마커이미지의 크기입니다
                            imageOption = {offset: new kakao.maps.Point(14, 20)};

                        const markerImage  = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
                            markerPosition = new window.kakao.maps.LatLng(
                            parseFloat(dLatLng[i][0]),
                            parseFloat(dLatLng[i][1])
                        );
                        const newMarker = new window.kakao.maps.Marker({
                            position: markerPosition,
                            image: markerImage,
                            clickable: true
                        });

                        const newInfo = new window.kakao.maps.CustomOverlay({
                            clickable: false,
                            map: map,
                            position: newMarker.getPosition(),
                            removable: true,
                            zIndex: 5
                        })

                        const wrapperDiv = document.createElement('div');
                        wrapperDiv.classList.add('overlay-wrapper-onlyimg');

                        const barDiv = document.createElement('div');
                        barDiv.classList.add('overlay-bar');

                        const xmarkDiv = document.createElement('div');
                        xmarkDiv.classList.add('xmark');
                        const iElement = document.createElement('i');
                        iElement.classList.add('fa-solid', 'fa-xmark');
                        iElement.addEventListener('click', closeOverlay);
                        xmarkDiv.appendChild(iElement);

                        const imgWrapperDiv = document.createElement('div');
                        imgWrapperDiv.classList.add('overlay-img-wrapper');
                        const imgElement = document.createElement('img');
                        imgElement.src = infoImg;
                        imgElement.alt = 'Building Image';
                        imgWrapperDiv.appendChild(imgElement);

                        barDiv.appendChild(xmarkDiv);
                        wrapperDiv.appendChild(barDiv);
                        wrapperDiv.appendChild(imgWrapperDiv);

                        newInfo.setContent(wrapperDiv)

                        function closeOverlay() {
                            if (map) {
                                if (newInfo.getMap() === null) {
                                    newInfo.setMap(map, newMarker)
                                }
                                else {
                                    newInfo.setMap(null)
                                }
                            }
                        }

                        newInfo.setMap(null)
                        newiW.push(newInfo)

                        window.kakao.maps.event.addListener(newMarker, 'click', function(){
                            closeOverlay();
                            console.log("버튼 눌림")
                        });

                        newMarker.setMap(map);
                        newMarkers.push(newMarker);

                    } else {
                        console.log("none");
                    }
                }
                addIW((newiW))
                setMarkers(newMarkers); // Set the new markers in the state variable
            } catch {
                console.log("createMarker Error");
            }
        }
    }

    function drawPath(nestedList) {
        if (map) {
            deleteLine(); // Delete the previously drawn path
            try {
                const newPath = [];
                for (let i = 0; i < nestedList.length - 1; i++) {
                    const startLatLng = new window.kakao.maps.LatLng(
                        parseFloat(nestedList[i][0]),
                        parseFloat(nestedList[i][1])
                    );
                    const finishLatLng = new window.kakao.maps.LatLng(
                        parseFloat(nestedList[i + 1][0]),
                        parseFloat(nestedList[i + 1][1])
                    );
                    const newLine = drawLine(map, startLatLng, finishLatLng); // Draw each line of the new path
                    newPath.push(newLine);
                }
                setPath(newPath); // Set the new path in the state variable
            } catch {
                console.log("drawPath error");
            }
        }
    }




    return (
        <div className="map-wrapper">
            <div className="controller-wrapper">
                <select className="box-style" onChange={(e)=>{
                        SetStart(e.target.value);
                }}>
                    <option selected disabled>출발지 선택</option>
                    {loc.map((building) => <option key={building.code} value={building.code}>{building.id}</option>)}
                </select>
                <select className="box-style" onChange={(e) =>{
                    const selectedValue = e.target.value;
                    SetFinish(selectedValue);
                }}>
                    <option selected disabled>도착지 선택</option>
                    {loc.map((building) => (
                        <option
                            key={building.code}
                            value={building.code}
                            selected={building.code === storedData}
                        >
                            {building.id}
                        </option>))}
                </select>
                <button className="button-style" onClick={
                    ()=>{
                        axios.get('/map', {
                            params: {
                                start: start,
                                finish: finish
                            }
                        })
                            .then(response => {
                                const nestedList = response.data; // Assuming the response contains the List<List<Double>> structure
                                console.log(nestedList);
                                // Handle the nestedList data here
                                setImage(nestedList.image)
                                setShortestPath(nestedList.shortestPath);
                                setDLatLng(nestedList.dLatLng)
                                setSearchClicked(true);
                            })
                            .catch(error => {
                                console.log("Error:", error);
                            });
                    }

                }
                >경로 탐색</button>
            </div>

            <span>
                <div id="map" className="map-style"></div>
            </span>
        </div>
    )

}

export default KakaoMap;