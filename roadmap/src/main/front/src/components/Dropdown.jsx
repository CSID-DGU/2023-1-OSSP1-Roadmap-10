import LocList from "./buildinginfo"

const loc = LocList();

function selectBuilding(){
    return(
            <select>
            {loc.map((building) => {
                return(
                    <option key = {building.code} value = {building.id}>{building.id}</option>
                    )})}
            </select>
    )
}

export default selectBuilding;