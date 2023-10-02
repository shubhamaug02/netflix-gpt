import React,{useState, useRef} from 'react'
import Header from './Header'
import {checkValidData, checkValidDataWithName} from '../utils/validate'
import {auth} from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {useDispatch} from 'react-redux';
import {addUser} from '../utils/userSlice';
import { USER_AVATAR, BG_IMG_URL } from '../utils/constants';

const Login = () => {

    const [isSignInForm,setIsSignInForm]= useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const dispatch = useDispatch();

    const handleButtonClick = () => {
        // Validate form data
        // console.log(email.current.value);
        // console.log(password.current.value);
        let message;
        if(isSignInForm)
        message = checkValidData(email.current.value, password.current.value);
        else
        message = checkValidDataWithName(name.current.value,email.current.value, password.current.value);

        //console.log(errorMessage);
        setErrorMessage(message);

        if(message) return;
        if(!isSignInForm){
            //Sign Up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name.current.value, 
                    photoURL: USER_AVATAR
                  }).then(() => {
                    const {uid, email, displayName, photoURL} = auth.currentUser;
                    dispatch(addUser({uid, email, displayName, photoURL}));
                  }).catch((error) => {
                    // An error occurred
                    // ...
                  });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorMessage + "-" + errorCode);
            });

        }
        else {
            //SignIn logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorMessage + "-" + errorCode);
                });
            }
    }

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
    return (
        <div>
            <Header />
            <div className="absolute">
                <img className="h-screen object-cover" src={BG_IMG_URL} 
                 alt="Background image"
                />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg">
                <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && <input ref={name} type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700"/>}
                <input ref={email} type="text" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-700"/>
                <input ref={password} type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-700"/>
                <p className="text-red-500 font-bold text-lg">{errorMessage}</p>
                <button className="p-4 my-4 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className="cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? SignUp now" : "Already Registered? SignIn Now"}</p>
            </form>
        </div>
    )
}

export default Login
