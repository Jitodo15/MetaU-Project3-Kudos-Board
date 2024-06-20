import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./LogIn.css"

function LogIn(){
    const navigate = useNavigate()

    async function handleSubmit(event){
        event.preventDefault()

        navigate("/home")
    }
    return(
        <div className="login">
            <h2>Login</h2>
            <form>
                <input type="text" placeholder="Enter username" required/>
                <input type="password" placeholder="Password"/>
                <button type="submit">Login</button>

            </form>

        </div>
    )

}

export default LogIn;
