import PostCard from '../../components/PostCard/PostCard';
import "./PostFeed.css";

function PostFeed({postList}) {
    return (
      <div>
        <h2>Dev.to Posts</h2>
         <ul>
      {postList.map((post) => {
        return (
          <PostCard key={post.id} post={post}/>
        )
        })}
      </ul>
      </div>
    )
}

export default PostFeed;