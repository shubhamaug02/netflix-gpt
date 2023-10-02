import React from 'react'
import GPTSearchBar from './GPTSearchBar';
import GPTSearchSuggestions from './GPTSearchSuggestions';
import {BG_IMG_URL} from '../utils/constants';

const GPTSearch = () => {
    return (
        <div>
             <div className="fixed -z-10">
                <img src={BG_IMG_URL} 
                 alt="Background img"
                />
            </div>
            <GPTSearchBar />
            <GPTSearchSuggestions />
        </div>
    )
}

export default GPTSearch
