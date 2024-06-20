import "./SearchBar.css"

function SearchBar(props){

    function handleInputChange(event){
        props.handleSearchChange(event.target.value)
    }


    return(
        <div className="searchbar">
            <input type="text" value={props.searchQuery} placeholder="Search boards..." onChange={handleInputChange} />
        </div>

    )

}

export default SearchBar;
