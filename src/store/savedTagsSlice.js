import { createSlice } from '@reduxjs/toolkit';

const savedTags = () => {
try {
const cachedTags = JSON.parse(localStorage.getItem('cachedTags')) || [];
return cachedTags;
} catch  {
    return [];
}
}

export const savedTagsSlice = createSlice({
    name: "savedTags",
    initialState: {
        tags: savedTags(),
    },
    reducers: {
        saveTag: (state, action) => {
            if (!state.tags.includes(action.payload)) {
            state.tags =  [
                ...state.tags,
                action.payload
            ]
             localStorage.setItem('cachedTags', JSON.stringify(state.tags));
            }
        },
        removeTag: (state, action) => {
            state.tags = state.tags.filter((tag) => {
                return (
                    tag !== action.payload
                )
            })
            localStorage.setItem('cachedTags', JSON.stringify(state.tags));
        },
    },
})

export const { saveTag, removeTag } = savedTagsSlice.actions;
export const selectTagList = (state) => state.savedTags.tags;
export default savedTagsSlice.reducer;