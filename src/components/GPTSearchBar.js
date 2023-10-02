import {useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovies } from '../utils/gptSlice';
import lang from '../utils/languageConstants';
import openai from '../utils/openai';

const GPTSearchBar = () => {
    const langKey = useSelector(store => store.config.lang);
    const searchTestRef = useRef(null);
    const dispatch = useDispatch();

    const searchMovieInTMDB = async (movieName) =>{
         const data = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movieName +'&include_adult=false&language=en-US&page=1', API_OPTIONS);
         const json = await data.json();

         return json.results;
    }

    const handleGptSearchClick = async () => {
        //console.log(searchTestRef.current.value);

        const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query : " +
        searchTestRef.current.value + ". only give names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

        const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery}],
            model: 'gpt-3.5-turbo',
          });

          if(!gptResults.choices[0]){
              //error Handling
          }
          
          //console.log(gptResults.choices[0].message.content);

          const getMoviesName = gptResults.choices[0].message.content.split(",");

          const promiseArr = getMoviesName.map(movie => searchMovieInTMDB(movie));

          const tmdbResults = await Promise.all(promiseArr);

          //console.log(tmdbResults);
          dispatch(addGptMovies({movieNames: getMoviesName, movieResults: tmdbResults}));

          //"Jab We Met, Dilwale Dulhania Le Jayenge, Band Baaja Baaraat, Andaz Apna Apna, Humpty Sharma Ki Dulhania"
    }

    return (
        <div className="pt-[40%] md:pt-[10%] flex justify-center">
            <form className="w-screen md:w-1/2 bg-black grid grid-cols-12" onSubmit={(e) => e.preventDefault()}>
                <input
                  ref={searchTestRef}
                  type="text"
                  className="p-4 m-4 col-span-9"
                  placeholder={lang[langKey].gptSearchPlaceholder} 
                />
                <button className="col-span-3 m-4 px-2 md:px-4 py-2 bg-red-700 text-white rounded-lg" onClick={handleGptSearchClick}> 
                   {lang[langKey].search}
                </button>
            </form>
        </div>
    )
}

export default GPTSearchBar
