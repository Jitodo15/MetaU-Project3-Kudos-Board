import { useState, useEffect } from "react";

function CommentList(props){
    const [comments, setComments] = useState([]);

    useEffect(() => {

        fetchComments();
    }, [props.cardId])

    async function fetchComments(){
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cards/${props.cardId}/comments`)
            const data = await response.json()
            setComments(data);

        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        if(props.refreshComments){
            fetchComments();
        }
    }, [props.refreshComments])

    return(
        <div>
            <h4>Comments</h4>
            {comments.map(comment => (

                    <div key={comment.id}>
                        <p>{comment.content}</p>
                    </div>



            ))}
        </div>

    )

}

export default CommentList;
