import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const SecondaryContainer = () => {
    const movies = useSelector(store => store.movies);
    //console.log(movies);
    if(!movies)
    return;
    return (
       <div className=" bg-black">
            <div className="-mt-52 relative z-20 pl-8">
            <MovieList title="Now Playing" movies={movies.nowPlayingMovies}/>
            <MovieList title="Trending" movies={movies.nowPlayingMovies}/>
            <MovieList title="Popular" movies={movies.popularMovies}/>
            <MovieList title="Upcoming" movies={movies.nowPlayingMovies}/>
            {/*
               Movie List - Popular
                 MovieCard * n
               MovieList - Now Playing
               MovieList - Trending 
               MovieList - Horror 
             */}
            </div>
       </div>
    )
}

export default SecondaryContainer
