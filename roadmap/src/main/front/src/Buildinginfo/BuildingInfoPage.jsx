/*global kakao*/
import React, { useEffect, useState } from "react";
import LocList from "../components/buildinginfo";



const { kakao } = window;
const loc = LocList();



function BuildingInfoPage() {

    const [map, settingMap] = useState(null);
    const [render1, setRender1] = useState(true);


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
            loc.map((building) => {
                const markerPosition = new window.kakao.maps.LatLng(building.Lat, building.Lng);
                const newMarker = new window.kakao.maps.Marker({
                    position: markerPosition,
                    zIndex : 4
                });


                newMarker.setMap(map);

                const newInfoWindow = new window.kakao.maps.CustomOverlay({
                    clickable: true,
                    map: map,
                    position: newMarker.getPosition(),
                    removable: true,
                    zIndex: 5
                })

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

                const buttonClicked=(id) => {
                    localStorage.setItem('myData', id);
                    window.location.href = '/map';
                }

                const textWrapperDiv = document.createElement('div');
                textWrapperDiv.classList.add('overlay-text-wrapper');
                const facilitiesParagraph = document.createElement('p');
                const explainParagraph = document.createElement('p');
                explainParagraph.innerHTML = building.explain.replace(/\n/g, "<br>");
                const locationParagraph = document.createElement('p');
                const button = document.createElement('button');
                button.textContent = '경로 탐색';
                button.addEventListener('click', () => buttonClicked(building.code));
                textWrapperDiv.appendChild(facilitiesParagraph);
                textWrapperDiv.appendChild(explainParagraph);
                textWrapperDiv.appendChild(locationParagraph);
                contentWrapperDiv.appendChild(textWrapperDiv);
                textWrapperDiv.appendChild(button);
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

                newInfoWindow.setMap(null)

                window.kakao.maps.event.addListener(newMarker, 'click', closeOverlay)
            })
        }
    }, [map]);


    return (
        <div className="map-wrapper">
            <span>
                <div id="map" className="map-style"></div>
            </span>
        </div>
    )
}

export default BuildingInfoPage;