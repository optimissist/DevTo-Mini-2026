import PostCard from "../PostCard/PostCard";

function PostFeed({postList}) {
    return (
         <ul>
      {postList.map((post) => {
        return (
          <PostCard key={post.id} post={post}/>
        )
        })}
      </ul>
    )
}

export default PostFeed;