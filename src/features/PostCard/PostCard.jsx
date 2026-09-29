function PostCard({post}) {
    return (
          <li>
            <a href={post.url} target="_blank"  rel="noopener noreferrer">
            <p>{post.title}: {post.description}</p>
            </a>
            <p>{post.readable_publish_date}, {post.user.username}</p>
            <p>{post.tags}</p>
          </li>
    )
}

export default PostCard;