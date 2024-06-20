import React, { useState } from "react";
import "./Board.css";



function Board(props) {

  return (
    <div className="board">
      <img src={props.image_url} alt=""/>
      <h3>{props.title}</h3>
      <p>{props.category}</p>
      <div className="delete-and-view-buttons">
          <button className="view-button" onClick={() => {
                                                      props.displayBoard()
                                                      props.handleSetBoardId()

                                                   }}>View Board</button>
          <button className="delete-button" onClick={props.deleteBoard}>Delete Board</button>

      </div>
    </div>

  )
}

export default Board;
