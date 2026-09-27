function PostFeed({postList}) {
    return (
         <ul>
      {postList.map((post) => {
        return (
          <li key={post.id}>
            <a href={post.url} target="_blank"  rel="noopener noreferrer">
            <p>{post.title}: {post.description}</p>
            </a>
            <p>{post.readable_publish_date}, {post.user.username}</p>
            <p>{post.tags}</p>
          </li>
        )
        })}
      </ul>
    )
}

export default PostFeed;