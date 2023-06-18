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

    const handleHomeButtonClick = (id) => {
        // Get the data you want to pass
        const data = id;

        // Store the data in local storage
        localStorage.setItem('myData', data);

        window.location.href = '/map'
    };

    const getImgAdd = (imgName) => {
        try {
            const imgAdd = require(`../images/${imgName}`);
            return imgAdd;
        } catch (error) {
            return null;
        }
    };

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
                    position: markerPosition,
                    zIndex : 4
                });


                newMarker.setMap(map);

                addNewMarker(newMarker);
                markerArray.push(newMarker)

                const newInfoWindow = new window.kakao.maps.CustomOverlay({
                    clickable: false,
                    map: map,
                    position: newMarker.getPosition(),
                    removable: true,
                    zIndex: 5
                })




                function explainfacilities(){
                    const facilities  = []
                    let forIndex = 0;
                    building.facilities.forEach((index)=>{
                        if(index === 1){
                            if(forIndex === 0){
                                facilities.push("카페")
                            }else if(forIndex === 1){
                                facilities.push("식당")
                            }else if(forIndex === 2){
                                facilities.push("편의점")
                            }else if(forIndex === 3){
                                facilities.push("ATM")
                            }else if(forIndex === 4){
                                facilities.push("열람실")
                            }else if(forIndex === 5){
                                facilities.push("제세동기")
                            }else if(forIndex === 6){
                                facilities.push("복사기")
                            }else if(forIndex === 7){
                                facilities.push("유인복사기")
                            }else if(forIndex === 8){
                                facilities.push("증명서자동발급기")
                            }
                        }
                        forIndex ++;
                    })

                    return facilities
                }

                const imageSrc = getImgAdd(building.image)

                const wrapperDiv = document.createElement('div');
                wrapperDiv.classList.add('overlay-wrapper');

                const barDiv = document.createElement('div');
                barDiv.classList.add('overlay-bar');
                const hElement = document.createElement('h');
                hElement.textContent = building.id;
                const xmarkDiv = document.createElement('div');
                xmarkDiv.classList.add('xmark');
                const iElement = document.createElement('i');
                iElement.classList.add('fa-solid', 'fa-xmark');
                iElement.addEventListener('click', closeOverlay);
                xmarkDiv.appendChild(iElement);
                barDiv.appendChild(hElement);
                barDiv.appendChild(xmarkDiv);
                wrapperDiv.appendChild(barDiv);

                const contentWrapperDiv = document.createElement('div');
                contentWrapperDiv.classList.add('overlay-content-wrapper');

                const imgWrapperDiv = document.createElement('div');
                imgWrapperDiv.classList.add('overlay-img-wrapper');
                const imgElement = document.createElement('img');
                imgElement.src = imageSrc;
                imgElement.alt = 'Building Image';
                imgWrapperDiv.appendChild(imgElement);
                contentWrapperDiv.appendChild(imgWrapperDiv);

                const textWrapperDiv = document.createElement('div');
                textWrapperDiv.classList.add('overlay-text-wrapper');
                const facilitiesParagraph = document.createElement('p');
                const explainParagraph = document.createElement('p');
                explainParagraph.innerHTML = building.explain.replace(/\n/g, "<br>");
                const locationParagraph = document.createElement('p');
                const closeButton = document.createElement('button');
                closeButton.id = 'closeButton';
                closeButton.textContent = '경로찾기';
                closeButton.addEventListener('click', () => handleHomeButtonClick(building.code));
                textWrapperDiv.appendChild(facilitiesParagraph);
                textWrapperDiv.appendChild(explainParagraph);
                textWrapperDiv.appendChild(locationParagraph);
                textWrapperDiv.appendChild(closeButton);
                contentWrapperDiv.appendChild(textWrapperDiv);

                wrapperDiv.appendChild(contentWrapperDiv);

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

                newInfoWindow.setContent(wrapperDiv)

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