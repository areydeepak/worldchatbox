import {React,useState,useEffect,useRef} from 'react'
import io from "socket.io-client"

const socket=io('http://localhost:3002/')
socket.on("connect",()=>{
    const div=document.createElement("div");
    div.textContent="Your id is : " + `${socket.id}` ;
    document.getElementById("container").append(div);
})
socket.on("recieve",(message)=>{
    const div=document.createElement("div");
    div.textContent=message ;
    document.getElementById("container").append(div);
})

function Main() {
    const [text, settext] = useState("");
    const textInput = useRef(null);
    useEffect(() => {
        console.log(text);
    }, [text])
    let handleClick=()=>{
        settext(textInput.current.value);
        const div=document.createElement("div");
        div.textContent=textInput.current.value;
        document.getElementById("container").append(div);
        socket.emit('send',textInput.current.value);
        textInput.current.value="";
    }
    
    return (
        <div class="main">
            <div id="container" ></div>
            <form id="input">
                <label for="textbox">Message : </label>
                <input type="text" ref={textInput} id="textbox" onKeyPress={(e) => { if(e.key === 'Enter'){e.preventDefault() ; handleClick();}}}/>
                <button type="button" onClick={handleClick}>SEND</button>
            </form>
        </div>
    )
}

export default Main
