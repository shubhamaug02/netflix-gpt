import React,{useEffect} from 'react'
import { signOut } from "firebase/auth"
import {auth} from '../utils/firebase'
import { onAuthStateChanged } from "firebase/auth";
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {addUser, removeUser} from '../utils/userSlice';
import {toggleShowGptSearch} from '../utils/gptSlice';
import {changeLanguage} from '../utils/configSlice';
import {useDispatch} from "react-redux";
import {LOGO, SUPPORTED_LANGUAGES} from '../utils/constants';


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const showGptSearch = useSelector(store => store.gpt.showGptSearch);

    // Header will be present in all the pages. so better to call at this place inorder to use the navigate function
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                //sign up/sign in 
              const {uid, email, displayName, photoURL} = user;
              dispatch(addUser({uid, email, displayName, photoURL}));
              navigate("/browse"); 
              //navigate can only be used in the context of, we can't use the useNavigate from outside the router
            } else {
              // User is signed out
              dispatch(removeUser());
              navigate("/");
            }
          });

          //unsubscribe when component unmounts
        return () => unsubscribe();
    }, []);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
            navigate("/error");
          });
    }

    const handleGPTSearchClick = () => {
      dispatch(toggleShowGptSearch());
    }

    const handleLanguageChange = (e) => {
      dispatch(changeLanguage(e.target.value));
    }

    return (
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
           <img className="w-44 mx-auto md:mx-0" 
            src={LOGO}
            alt="logo"
           />
           {user && <div className="flex p-2 justify-between">
            {showGptSearch && <select 
               className="p-2 m-2 bg-gray-700 text-white"
               onChange={handleLanguageChange}
             >
               {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
             </select>}
            <button className="bg-purple-700 py-2 px-4 mx-4 my-2 text-white rounded-lg"
             onClick={handleGPTSearchClick}
            >
              {showGptSearch ? "HomePage" : "GPT Search" }
            </button> 
            <img
                className="h-12 w-12 hidden md:inline-block"
                src={user?.photoURL}
                alt="userIcon" 
            />
            <button onClick={handleSignOut} className="font-bold text-white">(Sign Out)</button>
           </div>}
        </div>
    )
}

export default Header;