import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadPostList, selectPostList, isLoading, failedToLoad} from './store/devtoSlice';
import { selectTagList } from './store/savedTagsSlice';
import PostFeed from './features/postFeed/PostFeed';
import Header from './components/Header/Header';
import SavedTags from './features/savedTags/SavedTags';

function App() {
  const dispatch = useDispatch();
  const postList = useSelector(selectPostList);
  const tagList = useSelector(selectTagList);
  const selectIsLoading = useSelector(isLoading);
  const didFailToLoad = useSelector(failedToLoad);
  

  useEffect(() => {
    if (postList.length === 0) {
      dispatch(loadPostList('/articles'));
    }
  }, [dispatch, postList])

  return (
    <div>
      <Header />
      {selectIsLoading && <p>Is Loading...</p>}
      {didFailToLoad && <p>This Failed To Load</p>}
      {!selectIsLoading && !didFailToLoad && <PostFeed postList={postList} />}
      <SavedTags tagList={tagList} />
    </div>
  )
}

export default App;