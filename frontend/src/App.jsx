import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import CreateForm from './CreateForm/CreateForm';
import CardList from './CardList/CardList';
import Home from './Home/Home';



function App() {
  const [displayCreateForm, setDisplayCreateForm] = useState(false)
  const [boards, setBoards] = useState([]);
  const [boardId, setBoardId] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [filteredBoards, setFilteredBoards] = useState([])
  const [userId, setUserId] = useState(null)
  const categories = ["all", "recent", "celebration", "thank you", "inspiration"];

  useEffect(() => {
    receiveBoardList();
  }, [userId])

  async function receiveBoardList(){

    try{
        const url = userId
        ? `http://localhost:3000/boards/user/${userId}`
        : 'http://localhost:3000/boards'
        const response = await fetch(url, {
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


  function handleDisplayCreateForm(){
    setDisplayCreateForm(!displayCreateForm);
  }

  function handleSetBoardId(id){
    setBoardId(id)

  }


  return (
    <Router>
      <div className='App'>

            <Header />
            <main>
              <Routes>
                <Route path='/' element={<Navigate to="/home" />}/>
                {/* <Route path='/login' element={<LogIn setUserId={setUserId}/>}/>
                <Route path='/signup' element={<SignUp/>}/> */}
                <Route
                  path="/home"
                  element={
                    <>
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
                      />
                       {displayCreateForm ?
                            <CreateForm displayForm={handleDisplayCreateForm} refreshBoards={receiveBoardList}  formName={"board"}/> :
                        null}

                    </>
                  }/>
                <Route path='/boards/:id/cards' element={
                  <>

                     <CardList boardId={boardId} displayForm={handleDisplayCreateForm} />
                  </>

                  }/>

              </Routes>
            </main>

            <Footer />
      </div>
    </Router>

  )
}

export default App
