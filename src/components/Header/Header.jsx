import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './Header.css';
import { loadPostList } from '../../store/devtoSlice';
import { saveTag, removeTag, selectTagList } from '../../store/savedTagsSlice';

const headerImage= "https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fthepracticaldev.s3.amazonaws.com%2Fi%2Fjrzutxzs0l43wqvw5k8z.png"

function Header() {
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    const tagList = useSelector(selectTagList);

    const isSavedTag = tagList.includes(searchTerm);

    function searchTermChange(e) {
        setSearchTerm(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(loadPostList(`/articles/?tag=${searchTerm}`))
    }

    function setSaveTag() {
        if (isSavedTag) {
            dispatch(removeTag(searchTerm));
        } else {
        dispatch(saveTag(searchTerm));
        }
    }


return (
    <header className="header">
        <div className='headerlogo'>
            <img src={headerImage} alt="A square app icon with rounded corners and a thin coral pink border framing a solid black background. In the center, large bold white capitals read 'DEV'. Below that, a pale yellow rectangular highlight block holds black lowercase text reading 'unofficial'." />
            <h4>Dev.To Mini</h4>
        </div>
        <form className="search" onSubmit={handleSubmit}>
            <input 
            type="text"
            placeholder="Search"
            onChange={searchTermChange}
            value={searchTerm}
            aria-label="Search Posts"
            />
            <button type="button" onClick={setSaveTag}>
                {isSavedTag ? "unSave" : "Save"}
            </button>
        </form>
    </header>
)    
}

export default Header;