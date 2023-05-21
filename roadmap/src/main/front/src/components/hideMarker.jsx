export const hideMarker = (map,markers,iW,path) =>{
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
export const showMarker = (map,markers,path) =>{
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