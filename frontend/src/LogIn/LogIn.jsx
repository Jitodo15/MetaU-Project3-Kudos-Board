import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./LogIn.css"

function LogIn(props){
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(event){
        event.preventDefault()
        try{

            const response = await fetch("http://localhost:3000/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            });
            const data = await response.json()
            if(data.userId){
                props.setUserId(data.userId)
            } else {
                alert(data.error)
            }
        } catch(err){
            console.log(err)
            alert("Login failed")
        }

        navigate("/home")
    }
    return(
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={() => handleSubmit}>
                <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button type="submit" onClick={handleSubmit}>Login</button>

            </form>

        </div>
    )

}

export default LogIn;
