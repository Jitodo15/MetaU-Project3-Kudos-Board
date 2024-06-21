import SearchBar from '../SearchBar/SearchBar';
import CreateButton from '../CreateButton/CreateButton';
import BoardList from '../BoardList/BoardList';
import FilterButton from '../FilterButton/FilterButton';



function Home({searchQuery, handleSearchChange, categories,
              filter, handleFilterChange, boards, handleDisplayCreateForm,
              deleteBoard, handleSetBoardId}) {


  return (


    <>
          <SearchBar searchQuery={searchQuery} handleSearchChange={handleSearchChange}/>
          <div className='buttons'>
          {categories.map(category => (

              <FilterButton key={category} category={category} currentFilter={filter} handleFilterChange={handleFilterChange}/>
          ))}
          </div>
          <div className='create-buttons'>
              <CreateButton name="Create New Board" displayForm={handleDisplayCreateForm} />
          </div>
          <BoardList boards={boards} deleteBoard={deleteBoard} handleSetBoardId={handleSetBoardId}/>



    </>

  )
}

export default Home;
