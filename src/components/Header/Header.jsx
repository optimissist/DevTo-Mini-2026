import './Header.css';

const headerImage= "https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fthepracticaldev.s3.amazonaws.com%2Fi%2Fjrzutxzs0l43wqvw5k8z.png"

function Header({searchTermChange, setSaveTag, searchTerm, isSavedTag, handleSubmit, clearSearchBar}) {

  return (
    <header className="header">
        <div className='headerlogo'>
            <img src={headerImage} alt="A square app icon with rounded corners and a thin coral pink border framing a solid black background. In the center, large bold white capitals read 'DEV'. Below that, a pale yellow rectangular highlight block holds black lowercase text reading 'unofficial'." />
            <h4>Dev.To Mini</h4>
        </div>
        <form className="search" onSubmit={handleSubmit}>
            <input 
            type="text"
            placeholder="Search"
            onChange={searchTermChange}
            value={searchTerm}
            aria-label="Search Posts"
            />
            <button type="button" onClick={handleSubmit}>
                Search
            </button>
            <button type="button" onClick={setSaveTag} disabled={isSavedTag}>
                Save
            </button>
            <button type="button" onClick={clearSearchBar}>
                Clear
            </button>
        </form>
    </header>
)    
}

export default Header;