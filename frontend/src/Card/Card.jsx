import { useState } from "react";
import "./Card.css"

function Card(props){

    const [upVote, setUpVote] = useState(props.upVote)
    const [voteName, setVoteName] = useState("UpVote")
    function handleUpVote(){
        if(voteName === "UpVote"){
            setUpVote(upVote + 1)
            setVoteName("DownVote")
        } else{
            setUpVote(upVote - 1)
            setVoteName("UpVote")
        }


    }

    return(
        <div className="card">
            <p>{props.message}</p>
            <img src={props.image_url} alt="" />
            <p>Card by {props.author}</p>
            <div className="card-buttons">
                <button onClick={handleUpVote}>{voteName}</button>
                <p>{upVote}</p>
                <button onClick={props.deleteCard}>Delete Card</button>

            </div>
        </div>
    )

}

export default Card;
