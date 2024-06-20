import "./CreateButton.css"

function CreateButton(props){
    return (
        <button onClick={() =>
            {props.name.includes("Create") ? props.displayForm():null}

                }>{props.name}</button>
    )
}

export default CreateButton;
