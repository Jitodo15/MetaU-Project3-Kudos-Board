import { useState } from "react";
import "./Card.css"
import CommentList from "../CommentList/CommentList";

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
            <p>Card by {props.author? props.author: "anonymous"}</p>
            <div className="card-buttons">
                <button onClick={handleUpVote}>{voteName}</button>
                <p>{upVote}</p>
                <button onClick={props.deleteCard}>Delete Card</button>
            </div>
            <button onClick={() => {
                props.handleDisplayCommentForm()
                props.handleSelectedCardId()}}><i className="fa-solid fa-comment"></i></button>
            <CommentList cardId={props.cardId} refreshComments={props.refreshCards}/>
        </div>
    )

}

export default Card;
