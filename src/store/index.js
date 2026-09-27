import {configureStore, combineReducers} from '@reduxjs/toolkit';
import devtoSlice from './devtoSlice';
import savedTagsSlice from './savedTagsSlice';

export default configureStore({
    reducer: combineReducers({
        devto: devtoSlice,
        savedTags: savedTagsSlice,
    }),
});