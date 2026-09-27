function SavedTags({tagList}) {
 return (
         <ul>
      {tagList.map((tag) => {
        return (
          <li key={tag}>
            {tag}
          </li>
        )
        })}
      </ul>
    )
}

export default SavedTags;