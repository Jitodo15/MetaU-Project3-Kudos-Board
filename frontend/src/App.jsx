import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import CreateForm from './CreateForm/CreateForm';
import CardList from './CardList/CardList';
import Home from './Home/Home';
import LogIn from './LogIn/LogIn';
import SignUp from './SignUp/SignUp';

function App() {
  const [displayCreateForm, setDisplayCreateForm] = useState(false)
  const [boards, setBoards] = useState([]);
  const [boardId, setBoardId] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [filteredBoards, setFilteredBoards] = useState([])
  const categories = ["all", "recent", "celebration", "thank you", "inspiration"];

  useEffect(() => {
    receiveBoardList();
  }, [])

  async function receiveBoardList(){
    try{
        const response = await fetch('http://localhost:3000/boards', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        });
        const data = await response.json();
        setBoards(data)
    } catch(err){
        console.log(err)
    }

  }

  async function handleSearchBoards(query){
    try{
      const response = await fetch(`http://localhost:3000/boards/search/${query}`)
      const data = await response.json()
      setBoards(data)
    } catch(err){

    }
  }

  async function deleteBoard(boardId){
    try{
        const response = await fetch(`http://localhost:3000/boards/${boardId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if(response.ok){
            setBoards(props.boards.filter(board => board.id !== boardId))
            receiveBoardList();
        }
    } catch(err){

    }
  }

  function handleSearchChange(query){
    setSearchQuery(query);
    if(query.length > 0){
      handleSearchBoards(query)
    } else{
      receiveBoardList()
    }
  }

  function handleFilterBoardsCategory(){
    if(filter === "all"){
      setFilteredBoards(boards)
    } else if(filter==="recent"){
      const sortedBoards = boards.sort((a,b) => b.id - a.id);
      const lastThreeBoards = sortedBoards.slice(0,3)
      setFilteredBoards(lastThreeBoards)

    } else{
      const filtered = boards.filter(board => board.category === filter);
      setFilteredBoards(filtered)
    }

  }

  useEffect(() => {
    handleFilterBoardsCategory();
  }, [filter, boards])

  function handleFilterChange(category){
    setFilter(category)
  }

  // function handleDisplayBoardPage() {
  //   setDisplayBoardPage(!displayBoardPage);
  // }

  function handleDisplayCreateForm(){
    setDisplayCreateForm(!displayCreateForm);
  }

  function handleSetBoardId(id){
    setBoardId(id)

  }


  return (
    <Router>
      <div className='App'>
            {displayCreateForm ? <CreateForm displayForm={handleDisplayCreateForm} formName={"board"}/> : null}
            <Header />
            <main>
              <Routes>
                <Route path='/' element={<Navigate to="/login" />}/>
                <Route path='/login' element={<LogIn/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route
                  path="/home"
                  element={
                    <Home
                      searchQuery={searchQuery}
                      handleSearchChange={handleSearchChange}
                      categories={categories}
                      filter={filter}
                      handleFilterChange={handleFilterChange}
                      boards={filteredBoards}
                      handleDisplayCreateForm={handleDisplayCreateForm}
                      deleteBoard={deleteBoard}
                      handleSetBoardId={handleSetBoardId}
                  />}/>
                <Route path='/boards/:id/cards' element={<CardList boardId={boardId} displayForm={handleDisplayCreateForm}  />}/>

              </Routes>
            </main>

            <Footer />
      </div>
    </Router>

  )
}

export default App
