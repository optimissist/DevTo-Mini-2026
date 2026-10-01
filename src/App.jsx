import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadPostList, selectPostList, isLoading, failedToLoad} from './store/devtoSlice';
import { saveTag, removeTag, selectTagList } from './store/savedTagsSlice';
import PostFeed from './features/postFeed/PostFeed';
import Header from './components/Header/Header';
import SavedTags from './features/savedTags/SavedTags';
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const postList = useSelector(selectPostList);
  const tagList = useSelector(selectTagList);
  const selectIsLoading = useSelector(isLoading);
  const didFailToLoad = useSelector(failedToLoad);
  const isSavedTag = tagList.includes(searchTerm);
  
      function searchTermChange(e) {
          setSearchTerm(e.target.value);
      }
  
      function setSaveTag() {
          if (!isSavedTag && searchTerm !== "") {
          dispatch(saveTag(searchTerm));
          }
      }

      function clearSearchBar() {
        setSearchTerm("");
      }
  
            function handleSubmit(e) {
          e.preventDefault();
          dispatch(loadPostList(`/articles/?tag=${searchTerm}`))
      }

      function setSavedTags(tag) {
  dispatch(loadPostList(`/articles/?tag=${tag}`));
  setSearchTerm(tag)
}

function setTagToRemove(tag) {
  dispatch(removeTag(tag));
}
  
function sendHome() {
  dispatch(loadPostList('/articles'))
  setSearchTerm("");
}

  useEffect(() => {
    if (postList.length === 0) {
      dispatch(loadPostList('/articles'));
    }
  }, [dispatch, postList])

  return (
    <>
      <Header searchTermChange={searchTermChange} setSaveTag={setSaveTag} handleSubmit={handleSubmit} searchTerm={searchTerm} isSavedTag={isSavedTag} clearSearchBar={clearSearchBar}/>
       <div className="body">
      {selectIsLoading && <p className="isLoading">Is Loading...</p>}
      {didFailToLoad && <p className="didFailToLoad">This Failed To Load</p>}
      {!selectIsLoading && !didFailToLoad && <PostFeed postList={postList} setSavedTags={setSavedTags} />}
      <SavedTags tagList={tagList} setSavedTags={setSavedTags} setTagToRemove={setTagToRemove} sendHome={sendHome}/>
      </div>
    </>
  )
}

export default App;