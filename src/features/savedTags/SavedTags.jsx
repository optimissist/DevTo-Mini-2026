import "./SavedTags.css";
import {useDispatch} from 'react-redux';
import { loadPostList } from '../../store/devtoSlice';
import { removeTag } from '../../store/savedTagsSlice';

function SavedTags({tagList}) {
  const dispatch = useDispatch();

function setSavedTags(tag) {
  dispatch(loadPostList(`/articles/?tag=${tag}`));
}

function setTagToRemove(tag) {
  dispatch(removeTag(tag));
}
  
 return (
  <div className="sidebar">
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