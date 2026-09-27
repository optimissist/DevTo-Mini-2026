import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadPostList, selectPostList} from './store/devtoSlice';
import { selectTagList } from './store/savedTagsSlice';
import PostFeed from './features/postFeed/PostFeed';
import Header from './components/Header/Header';
import SavedTags from './features/savedTags/savedTags';

function App() {
  const dispatch = useDispatch();
  const postList = useSelector(selectPostList);
  const tagList = useSelector(selectTagList);

  useEffect(() => {
    if (postList.length === 0) {
      dispatch(loadPostList('/articles'));
    }
  }, [dispatch, postList])

  return (
    <div>
      <Header />
      <PostFeed postList={postList} />
      <SavedTags tagList={tagList} />
    </div>
  )
}

export default App;