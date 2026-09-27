import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadPostList, selectPostList} from './store/devtoSlice';
import PostFeed from './features/Post/PostFeed';
import Header from './components/Header/Header';

function App() {
  const dispatch = useDispatch();
  const postList = useSelector(selectPostList);

  useEffect(() => {
    if (postList.length === 0) {
      dispatch(loadPostList('/articles'));
    }
  }, [dispatch, postList])

  return (
    <div>
      <Header />
      <PostFeed postList={postList} />
    </div>
  )
}

export default App;