import { useState } from "react";
import "./CommentForm.css"

function CommentForm({cardId, displayForm, authorId, refreshComments}){

    const [content, setContent] = useState('');

    async function handleSubmit(event){

        event.preventDefault();
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cards/${cardId}/comments`,{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({content, authorId})
            })

            if(response.ok){
                setContent('')
                refreshComments()
            }


        } catch(err){
            console.log(err)

        }
    }

    return(
        <div id="create-card-form" className="modal-overlay">
            <div className="modal-content">
                <span className="close" onClick={displayForm}>&times;</span>
                <form onSubmit={(e) => {
                        handleSubmit(e)
                        displayForm()}}>
                    <textarea value={content} placeholder="Add a comment" onChange={(e) => setContent(e.target.value)} required/>
                    <button type="submit">Add Comment</button>
                </form>
            </div>
        </div>
    )

}

export default CommentForm;
