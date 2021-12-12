import {React,useRef} from 'react'
import io from "socket.io-client"

const socket=io('http://localhost:3002')
socket.on("connect",()=>{
    const div=document.createElement("div");
    div.textContent="Your id is : " + `${socket.id}` ;
    document.getElementById("container").append(div);
})
socket.on("recieve",(message,id)=>{
    const div=document.createElement("div");
    //console.log(id);
    //const label=document.createElement("label");
    div.id="others"
    const h6=document.createElement("h6");
    h6.textContent="id: "+id;
    h6.id="id"
    div.textContent=message ;
    document.getElementById("container").append(div);
    div.append(h6);
   
})

function Main() {
    //const [text, settext] = useState("");
    const textInput = useRef(null);
    // useEffect(() => {
    //     console.log(text);
    // }, [text])
    let handleClick=()=>{
        const div=document.createElement("div");
        div.id="user";
        //div.align="left";
        div.textContent=textInput.current.value;
        document.getElementById("container").append(div);
        socket.emit('send',textInput.current.value,socket.id);
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
