import '../css/homepage.css';
function Search(){

    return(
        <div className="search-container">
            <input
                type="search"
                placeholder="Search for books..."
                className="search-input"
            />
            <button className="search-button">
                <span class="material-symbols-outlined">
                    search_insights
                </span>
            </button>
        </div>
    );

}
export default Search;