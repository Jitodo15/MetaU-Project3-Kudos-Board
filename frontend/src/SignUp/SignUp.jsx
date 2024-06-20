import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css"

function SignUp(){

    const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault()

        navigate('/home')
    }

    return (
        <div className="signup">
            <h2>Signup</h2>
            <form>
                <input type="text" placeholder="Username" required/>
                <input type="password" placeholder="Password" required/>
                <input type="password" placeholder="Confirm Password" required/>
                <button type="submit">Signup</button>
            </form>

        </div>
    )
}

export default SignUp;
