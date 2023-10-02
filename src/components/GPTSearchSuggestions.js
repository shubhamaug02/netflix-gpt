import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const GPTSearchSuggestions = () => {
    const gpt = useSelector(store => store.gpt);
    const {movieNames, movieResults} = gpt;

    if(!movieNames) return null;
    return (
        <div className="p-4 m-4 bg-black text-white bg-opacity-90">
           {movieNames.map((movieName, index) =>  <MovieList key={movieName} title={movieName} movies={movieResults[index]}/>)}
        </div>
    )
}

export default GPTSearchSuggestions
