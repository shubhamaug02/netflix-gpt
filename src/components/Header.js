import React,{useEffect} from 'react'
import { signOut } from "firebase/auth"
import {auth} from '../utils/firebase'
import { onAuthStateChanged } from "firebase/auth";
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {addUser, removeUser} from '../utils/userSlice';
import {useDispatch} from "react-redux";
import {LOGO} from '../utils/constants';


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);

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

    return (
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
           <img className="w-44" 
            src={LOGO}
            alt="logo"
           />
           {user && <div className="flex p-2">
            <img
                className="h-12 w-12"
                src={user?.photoURL}
                alt="userIcon" 
            />
            <button onClick={handleSignOut} className="font-bold text-white">(Sign Out)</button>
           </div>}
        </div>
    )
}

export default Header;