import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {API_OPTIONS} from "../utils/constants";
import {addTrailerVideo} from '../utils/moviesSlice';


const useMovieTrailer = (movieId) => {

    const dispatch = useDispatch();
    const trailerVideo = useSelector(store => store.trailerVideo);

    const getMovieVideos = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/' + movieId +'/videos?language=en-US', API_OPTIONS);
        const json = await data.json();

        const movieVideos = json.results;
        const movieTrailers = movieVideos?.filter(video => video.type === "Trailer");
        const trailer = movieTrailers.length ? movieTrailers[0] : movieVideos[0];
        dispatch(addTrailerVideo(trailer));
       
    }

    useEffect(() =>{
        !trailerVideo && getMovieVideos();
    },[]);
    
}

export default useMovieTrailer;