import LocList from "./buildinginfo"

const loc = LocList()

const drawLine = (map, pathNode,stopNode) => {
    if(map && pathNode){
        if(pathNode.length === 0){
            return null
        }
        const path = []

        path.push(new window.kakao.maps.LatLng(pathNode[0].Lat, pathNode[0].Lng))
        /*if(stopNode.length !== 0){
            stopNode.map((node) => {
                const newPath = loc.find((building) => building.id === node)
                path.push(new window.kakao.maps.LatLng(newPath.Lat,newPath.Lng))
            })
        }*/
        if(stopNode.length !== 0){
            stopNode.map((building) => {
                path.push(new window.kakao.maps.LatLng(building.Lat, building.Lng))
            })
        }
        path.push(new window.kakao.maps.LatLng(pathNode[1].Lat, pathNode[1].Lng))
        
        
        const newPath = new window.kakao.maps.Polyline({
            path: path,
            strokeWeight: 5, 
            strokeColor: '#FFAE00', 
            strokeOpacity: 1, 
            strokeStyle: 'solid' 
        })

        newPath.setMap(map)

        return newPath
    }
    else{
        return null;
    }
}
export default drawLine