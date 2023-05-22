export const hideMarker = (map,markers,iW) =>{
    if(map){
        markers.map((marker) => {
            marker.setMap(null)
            console.log("마커 숨기기")
        })
        iW.map((infowindow) => {
            infowindow.close()
        })
        return markers
    }
}
export const showMarker = (map,markers) =>{
    if(map){
        markers.map((marker) => {
            marker.setMap(map)
            console.log("마커 띄우기")
        })
        return markers
    }
}