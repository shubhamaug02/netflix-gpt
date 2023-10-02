import {createSlice} from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        showGptSearch: false,
        movieNames: null,
        movieResults: null
    },
    reducers: {
        toggleShowGptSearch: (state) => {
             state.showGptSearch = !state.showGptSearch;
        },
        addGptMovies: (state, action) => {
            const {movieNames, movieResults} = action.payload;
            state.movieResults = movieResults;
            state.movieNames = movieNames;
        } 
    }
});

export const {toggleShowGptSearch, addGptMovies} = gptSlice.actions;

export default gptSlice.reducer;