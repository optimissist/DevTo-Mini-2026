import {configureStore, combineReducers} from '@reduxjs/toolkit';
import devtoSlice from './devtoSlice';

export default configureStore({
    reducer: combineReducers({
        devto: devtoSlice,
    }),
});