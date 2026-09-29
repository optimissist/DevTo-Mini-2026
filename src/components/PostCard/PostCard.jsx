import "./PostCard.css";

function PostCard({post}) {
    return (
          <li className="post">
            <a href={post.url} target="_blank"  rel="noopener noreferrer">
            <p>{post.title}</p>
            </a>
            <p>{post.description}</p>
            <p>{post.readable_publish_date}, {post.user.username}</p>
            <p>{post.tags}</p>
          </li>
    )
}

export default PostCard;