import "./Card.css"

function Card(){
    return(
        <div className="card">
            <p>Text Message</p>
            <img src="../public/badge photo.jpg" alt="" />
            <p>Card Author</p>
            <div className="card-buttons">
                <button>Upvote</button>
                <button>Delete Card</button>

            </div>
        </div>
    )

}

export default Card;
