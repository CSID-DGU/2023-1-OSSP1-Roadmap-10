import LocList from "./buildinginfo"

const loc = LocList()

const drawLine = (map,bothNode,stopNode) => {
    const node = [

    ]
    const path = [
    ]

    console.log(bothNode)
    node.push(loc.find((building) => building.id === bothNode[0]))
    
    stopNode.map((path) => {
        node.push(loc.find((building) => building.id === path))
    })
    node.push(loc.find((building) => building.id === bothNode[1]))
    console.log(node)
    console.log(stopNode)
    node.map((coord) => {
        path.push(new window.kakao.maps.LatLng(coord.Lat, coord.Lng))
    })
    console.log(path)


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