const drawLine = (map, startLatLng, finishLatLng) => {
    const path = [startLatLng, finishLatLng];

    const newPath = new window.kakao.maps.Polyline({
        path: [startLatLng, finishLatLng],
        strokeWeight: 5,
        strokeColor: "#FFAE00",
        strokeOpacity: 1,
        strokeStyle: "solid",
    });

    newPath.setMap(map);

    return newPath;
};

export default drawLine;
