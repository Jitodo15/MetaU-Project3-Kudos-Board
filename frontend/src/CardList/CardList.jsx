import { useState, useEffect } from "react";
import Card from "../Card/Card";
import "./CardList.css"
import CreateButton from "../CreateButton/CreateButton";
import CreateForm from "../CreateForm/CreateForm";
import { useParams } from "react-router-dom";
import CommentForm from "../CommentForm/CommentForm";

function CardList(props) {

    const [cards, setCards] = useState([]);
    const { id } = useParams();
    const [displayCreateForm, setDisplayCreateForm] = useState(false)
    const [displayCommentForm, setDisplayCommentForm] = useState(false)
    const [cardId, setCardId] = useState(null)

    async function receiveCardList(){
        try{
            const response = await fetch(`http://localhost:3000/boards/${id}/cards`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },

            });
            const data = await response.json();
            setCards(data)
        } catch(err){
            console.log(err)
        }

    }

    useEffect(() => {
        receiveCardList();


    }, [id])

    function handleDisplayCreateForm(){
        setDisplayCreateForm(!displayCreateForm)
    }

    function handleSelectedCardId(id){
        setCardId(id)
    }

    function handleShowCommentForm(){
        setDisplayCommentForm(!displayCommentForm)


    }

    async function deleteCard(boardId, cardId){
        try{
            const response = await fetch(`http://localhost:3000/boards/${boardId}/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if(response.ok){
                receiveCardList()

            }

        } catch(err){

        }
    }

    function displayCard(card){

        return(

            <Card key={card.id} cardId={card.id} refreshCards={receiveCardList} handleSelectedCardId={() => handleSelectedCardId(card.id)} upVote={card.upVote} deleteCard={()=> deleteCard(props.boardId, card.id)} author={card.author} handleDisplayCommentForm={handleShowCommentForm} image_url={card.image_url} message={card.message} />
        )

    }

    return (
        <>
          {displayCreateForm ? <CreateForm displayForm={handleDisplayCreateForm} refreshCards={receiveCardList} formName={"card"}/> : null}
            <CreateButton name="Create New Card" displayForm={handleDisplayCreateForm}/>
            <div className="card-list">
                {cards.map(displayCard)}
            </div>
            {displayCommentForm && (
                <CommentForm refreshComments={receiveCardList} cardId={cardId} displayForm={handleShowCommentForm}/>

            )}
        </>

    )
}

export default CardList;
