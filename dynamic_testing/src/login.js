import {useState, useContext} from 'react';
import axios from 'axios';
import {Context} from "./context.js"


function Login(props){
    const {setUserId, setPage} = useContext(Context)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // send login info to backend
    const login = (e)=>{
        e.preventDefault()
        if (username.trim().length > 0 && password.trim().length > 0){
            axios.post("http://127.0.0.1:5000/login", {username: username, password: password}).then((response)=>{
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
    
    return(
        // show login input boxes
        <div>
            <h2>Login</h2>
            <form onSubmit={login}>
                <input className="loginInput" required type="text" placeholder="Enter a username" onChange={(e)=>{setUsername(e.target.value)}}/>
                <br/>
                <input  className="loginInput" required type="password" placeholder="Enter a password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <br/>
                <button className="normalButton" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login