import "./PostCard.css";

function PostCard({post, setSavedTags}) {
    return (
          <li className="post">
            <a href={post.url} target="_blank"  rel="noopener noreferrer">
            <p>{post.title}</p>
            </a>
            <p>{post.description}</p>
            <a href={`https://www.dev.to/${post.user.username}`} target="_blank"  rel="noopener noreferrer"><p className="userName">—{post.user.username}</p></a>
            <p className="tagLine"><span>{post.readable_publish_date}</span><span className="tags">
              {post.tag_list.map((tag) => {
        return (
          <button key={tag} onClick={() => setSavedTags(tag)}>{tag}</button>
        )
        })}</span>
              </p>
          </li>
    )
}

export default PostCard;