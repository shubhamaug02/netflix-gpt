import React,{useState, useRef} from 'react'
import Header from './Header'
import {checkValidData, checkValidDataWithName} from '../utils/validate'

const Login = () => {

    const [isSignInForm,setIsSignInForm]= useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

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
    }

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
    return (
        <div>
            <Header />
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/f85718e8-fc6d-4954-bca0-f5eaf78e0842/ea44b42b-ba19-4f35-ad27-45090e34a897/IN-en-20230918-popsignuptwoweeks-perspective_alpha_website_large.jpg" 
                alt="Background image"
                />
            </div>
            <form onSubmit={(e) => e.preventDefault()}className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg">
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
