import NavBar from "../components/Navbar.jsx";
import {useState} from "react";
import axios from "axios";

function Main() {
    const selectList = ["L", "H", "A", "J"]
    const [id, SetId] = useState("");
    const [title, SetTitle] = useState("");

    const handleSelect1 = (e) => {
        SetId(e.target.value)
    }
    const handleSelect2 = (e) => {
        SetTitle(e.target.value)
    }

    return (
        <div>
            <NavBar></NavBar>
            <h>
                Hello! This is New Roadmap MainPage!
            </h>
            <select onChange={handleSelect1} value={id}>
                <option value="">Select Start</option>
                {selectList.map((item) => (
                    <option value={item} key={item}>
                        {item}
                    </option>
                ))}
            </select>
            <select onChange={handleSelect2} value={title}>
                <option value="">Select End</option>
                {selectList.map((item) => (
                    <option value={item} key={item}>
                        {item}
                    </option>
                ))}
            </select>
            <button
                onClick={
                    ()=>{
                        axios.get('/map',{
                            params:{
                                id : id,
                                title : title
                            }
                        }).catch(function(){
                            console.log('실패함')
                        })
                }}
                >전송</button>

        </div>
    );
}

export default Main;