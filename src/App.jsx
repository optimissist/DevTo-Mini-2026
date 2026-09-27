import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadPostList, selectPostList} from './store/devtoSlice';

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
      <ul>
      {postList.map((post) => {
        return (
          <li key={post.id}>
            <a href={post.url} target="_blank"  rel="noopener noreferrer">
            <p>{post.title}: {post.description}</p>
            <p>{post.readable_publish_date}, {post.user.username}</p>
            <p>{post.tags}</p>
            </a>
          </li>
        )
        })}
      </ul>
    </div>
  )
}

export default App;