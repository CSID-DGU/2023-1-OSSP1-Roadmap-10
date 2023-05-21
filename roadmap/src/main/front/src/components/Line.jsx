import LocList from "./buildinginfo"

const loc = LocList()

const drawLine = (map,bothNode) => {
    const node = [

    ]
    const path = [
    ]
    console.log(bothNode)
    bothNode.map((path) => {
        node.push(loc.find((building) => building.id === path))
    })
    console.log(node)

    path.push(new window.kakao.maps.LatLng(node[0].Lat, node[0].Lng))
    path.push(new window.kakao.maps.LatLng(node[1].Lat, node[1].Lng))


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
export default drawLine