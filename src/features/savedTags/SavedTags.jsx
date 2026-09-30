import "./SavedTags.css";

function SavedTags({tagList, setSavedTags, setTagToRemove, sendHome}) {

 return (
  <div className="sidebar">
    <button type="button" className="home"
    onClick={sendHome}
    >Home</button>
    <h3>Saved Tags</h3>
         <ul>
      {tagList.map((tag) => {
        return (
          <li key={tag}>
            <button 
            type="button"
            onClick={() => setSavedTags(tag)}> 
              {tag}
            </button>
            <button 
            type="button"
            onClick={() => setTagToRemove(tag)} 
            aria-label={`Remove ${tag}`}
            >
              x
            </button>
          </li>
        )
        })}
      </ul>
      </div>
    )
}

export default SavedTags;