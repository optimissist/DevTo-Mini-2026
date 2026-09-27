import {configureStore, combineReducers} from '@reduxjs/toolkit';
import redditSlice from './redditSlice';

export default configureStore({
    reducer: combineReducers({
        reddit: redditSlice,
    }),
});