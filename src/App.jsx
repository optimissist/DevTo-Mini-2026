import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadPostList, selectPostList} from './store/redditSlice';

function App() {
  const dispatch = useDispatch();
  const postList = useSelector(selectPostList);

  useEffect(() => {
    if (postList.length === 0) {
      dispatch(loadPostList('/r/all.json'));
    }
  }, [dispatch, postList])

  return (
    <div>
      <ul>
      {postList.map((post) => {
        return (
          <li key={post.data.id}>
            {post.data["title"]}
          </li>
        )
        })}
      </ul>
    </div>
  )
}

export default App;