import {configureStore} from "@reduxjs/toolkit";
import userReducer from './userSlice';
import moviesSlice from './moviesSlice';
import gptSlice from './gptSlice';
import configSlice from "./configSlice";

const appStore = configureStore({
    reducer: {
        user: userReducer,
        movies: moviesSlice,
        gpt: gptSlice,
        config: configSlice
    }
});

export default appStore;