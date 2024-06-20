import { useState, useEffect } from "react";
import Card from "../Card/Card";
import "./CardList.css"
import CreateButton from "../CreateButton/CreateButton";

function CardList(props) {

    const [cards, setCards] = useState([]);


    useEffect(() => {
        async function receiveCardList(){
            try{
                const response = await fetch(`http://localhost:3000/boards/${props.boardId}/cards`, {
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
        receiveCardList();


    }, [props.boardId])

    async function deleteCard(boardId, cardId){
        try{
            const response = await fetch(`http://localhost:3000/boards/${boardId}/cards/${cardId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if(response.ok){
                setCards(cards.filter(card => card.id !== cardId))
            }

        } catch(err){

        }
    }

    function displayCard(card){

        return(

            <Card key={card.id} upVote={card.upVote} deleteCard={()=> deleteCard(props.boardId, card.id)} author={card.author} image_url={card.image_url} message={card.message} />
        )

    }

    return (
        <>
            <CreateButton name="Create New Card" displayForm={props.displayForm}/>
            <div className="card-list">
                {cards.map(displayCard)}
            </div>
        </>

    )
}

export default CardList;
