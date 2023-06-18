/*global kakao*/
import React, { useEffect, useState } from "react";
import LocList from "../components/buildinginfo";
import { hideMarker, showMarker } from "../components/Marker";


const { kakao } = window;
const loc = LocList();

function ConvenientPage() {

    const [map, settingMap] = useState(null);
    const [render1,setRender1] = useState(true);
    const [markers, setMarkers] = useState([])
    const [iW, addIW] = useState([])
    const [path,setPath] = useState(null)
    const [stateMarker,setStateMarker] = useState(true)
    const [convNum, setSelectedValue] = useState('')

    const addNewMarker = (newMarker) => {
        setMarkers((prevMarker) => [...prevMarker, newMarker])
    }
    const cngMarker = (newMarker) => {
        setMarkers(newMarker)
    }
    const getImgAdd = (imgName) => {
        try {
            const imgAdd = require(`../images/convenient/${imgName}`);
            return imgAdd;
        } catch (error) {
            return null;
        }
    };

    useEffect(() => {
        const markerArray = []


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
                        newMarker.setMap(null);

                        addNewMarker(newMarker);
                        markerArray.push(newMarker)
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
        if (map && markers) {
            try {
                if (stateMarker) {
                    cngMarker(showMarker(map, markers));
                    path.setMap(map);
                } else {
                    cngMarker(hideMarker(map, markers, iW));
                    path.setMap(null);
                }
            } catch {
                console.log("error");
            }
        }

        // Clear the previous markers
        markers.forEach(marker => marker.setMap(null));
        iW.forEach(iw => iw.setMap(null));

        if (map && convNum !== '') {
            const markerArray = [];
            const IwArray = [];


            loc.forEach(building => {
                if (building.facilities[convNum] === 1) {
                    const markerPosition = new window.kakao.maps.LatLng(building.Lat, building.Lng);
                    const newMarker = new window.kakao.maps.Marker({
                        position: markerPosition,
                        clickable: true
                    });

                    const newInfo = new window.kakao.maps.CustomOverlay({
                        clickable: false,
                        map: map,
                        position: newMarker.getPosition(),
                        removable: true,
                        zIndex: 5
                    })
                    const convenientImage = building.code + "_" + convNum + ".png"

                    const imageSrc = getImgAdd(convenientImage)
                    console.log(convenientImage)

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
                    imgElement.src = imageSrc;
                    imgElement.alt = 'Building Image';
                    imgWrapperDiv.appendChild(imgElement);

                    barDiv.appendChild(xmarkDiv);
                    wrapperDiv.appendChild(barDiv);
                    wrapperDiv.appendChild(imgWrapperDiv);

                    newInfo.setContent(wrapperDiv)

                    newInfo.setMap(null);
                    IwArray.push(newInfo);

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

                    window.kakao.maps.event.addListener(newMarker, 'click', function(){
                        closeOverlay();
                    });

                    newMarker.setMap(map);
                    markerArray.push(newMarker);
                }
            });

            addIW(IwArray);
            setMarkers(markerArray);
        }
    }, [stateMarker, convNum]);





    const findConv = (e) =>{
        setSelectedValue(e.target.value);
    }



    return (
        <div className="map-wrapper">
            <div className="controller-wrapper">
                <select className="box-style" onChange={findConv}>
                    <option selected disabled>편의시설 선택</option>
                    <option value="0">카페</option>
                    <option value="1">식당</option>
                    <option value="2">편의점</option>
                    <option value="3">ATM</option>
                    <option value="4">열람실</option>
                    <option value="5">제세동기</option>
                    <option value="6">복사기</option>
                    <option value="7">유인복사실</option>
                    <option value="8">증명서자동발급기</option>
                </select>
            </div>

            <span>
                <div id="map" className="map-style"></div>
            </span>
        </div>
    )

}

export default ConvenientPage;