import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const postList = () => {
try {
const cachedPosts = JSON.parse(sessionStorage.getItem('cachedPosts')) || [];
return cachedPosts;
} catch  {
    return [];
}
}

export const loadPostList = createAsyncThunk('reddit/loadPostList', async(path) => {
    const url = `https://www.reddit.com${path}`;
    const body = await fetch(url);
    const response = await body.json();
    return response;
})

export const redditSlice = createSlice({
    name: "reddit",
    initialState: {
        posts: postList(),
        failedToLoad: false,
        isLoading: false,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(loadPostList.pending, (state) => {
            state.failedToLoad = false;
            state.isLoading = true;
        })
        .addCase(loadPostList.fulfilled, (state, action) => {
            state.failedToLoad = false;
            state.isLoading = false;
            state.posts = action.payload.data.children;
            sessionStorage.setItem('cachedPosts', JSON.stringify(action.payload.data.children));
        })
        .addCase(loadPostList.rejected, (state) => {
            state.failedToLoad = true;
            state.isLoading = false;
        })
    }
})

export const selectPostList = (state) => state.reddit.postList;
export const failedToLoad = (state) => state.reddit.failedToLoad;
export const isLoading = (state) => state.reddit.isLoading;
export default redditSlice.reducer;