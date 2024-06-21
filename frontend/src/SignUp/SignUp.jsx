import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css"

function SignUp(){
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    async function handleSubmit(event){

        event.preventDefault()
        try{

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            });
            const data = await response.json()

            if(response.ok){
                alert('Signup successful')
            } else {
                alert(data.error)
            }
        } catch(err){
            console.log(err)
            alert("Signup failed")
        }

        navigate("/home")
    }

    return (
        <div className="signup">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username} onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Signup</button>
            </form>

        </div>
    )
}

export default SignUp;
