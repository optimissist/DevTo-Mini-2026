import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const postList = () => {
try {
const cachedPosts = JSON.parse(sessionStorage.getItem('cachedPosts')) || [];
return cachedPosts;
} catch  {
    return [];
}
}

export const loadPostList = createAsyncThunk('devto/loadPostList', async(path) => {
    const url = `https://dev.to/api${path}`;
    const body = await fetch(url);
    const response = await body.json();
    return response;
})

export const devtoSlice = createSlice({
    name: "devto",
    initialState: {
        posts: postList(),
        failedToLoad: false,
        isLoading: false,
    },
    // reducers: {

    // },
    extraReducers: (builder) => {
        builder
        .addCase(loadPostList.pending, (state) => {
            state.failedToLoad = false;
            state.isLoading = true;
        })
        .addCase(loadPostList.fulfilled, (state, action) => {
            state.failedToLoad = false;
            state.isLoading = false;
            state.posts = action.payload;
            sessionStorage.setItem('cachedPosts', JSON.stringify(action.payload.data));
        })
        .addCase(loadPostList.rejected, (state) => {
            state.failedToLoad = true;
            state.isLoading = false;
        })
    }
})

export const selectPostList = (state) => state.devto.posts;
export const failedToLoad = (state) => state.devto.failedToLoad;
export const isLoading = (state) => state.devto.isLoading;
export default devtoSlice.reducer;