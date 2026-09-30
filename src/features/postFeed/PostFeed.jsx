import PostCard from '../../components/PostCard/PostCard';
import "./PostFeed.css";

function PostFeed({postList}) {
    return (
      <div>
        <div className="topLineCopy">
          <h2>
            <a href="https://www.dev.to" target="_blank">Dev.to</a> Posts
            </h2>
            <h5>"DEV is a community of software developers getting together to help one another out."</h5>
            <h6>These are the posts without any frills.</h6>
            </div>
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