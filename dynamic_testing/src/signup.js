import {useState, useContext} from 'react';
import axios from 'axios';
import {Context} from "./context.js"

function Signup(){
    const {setUserId, setPage} = useContext(Context)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // send sign up info to backend
    const signup = (e)=>{
        e.preventDefault()
        if (username.trim().length > 0 && password.trim().length > 0){
            axios.post("http://127.0.0.1:5000/signup", {username: username, password: password}).then((response)=>{
                if (response.data.error){
                    alert(response.data.error)
                }
                else{
                    setUserId(response.data.userId)
                    setPage('savedTests')
                }
            })
        } 
    }
    
    // sign up inputs
    return(
        <div>
            <h2>Sign up</h2>
            <form onSubmit={signup}>
                <input className="loginInput" required type="text" placeholder="Enter a username" onChange={(e)=>{setUsername(e.target.value)}}/>
                <br/>
                <input  className="loginInput" required type="password" placeholder="Enter a password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <br/>
                <button className="normalButton" type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default Signup