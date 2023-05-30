import NavBar from "../components/Navbar.jsx";
import {useState} from "react";
import axios from "axios";

function Main() {
    const [id, Setid] = useState();
    const [title, SetTitle] = useState();

    return (
        <div>
            <NavBar></NavBar>
            <h>
                Hello! This is New Roadmap MainPage!
            </h>
            <input onChange={(e)=>{
                Setid(e.target.value);
            }}/>
            <input onChange={(e)=>{
                SetTitle(e.target.value);
            }}/>
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