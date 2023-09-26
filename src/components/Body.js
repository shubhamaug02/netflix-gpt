import React, {useEffect} from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Browse from './Browse'
import Login from './Login'
import {auth} from '../utils/firebase'
import { onAuthStateChanged } from "firebase/auth";
import {useDispatch} from "react-redux";
import {addUser, removeUser} from '../utils/userSlice';

const Body = () => {
    const dispatch = useDispatch();

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        }
    ]);


    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                //sign up/sign in 
              const {uid, email, displayName, photoURL} = user;
              dispatch(addUser({uid, email, displayName, photoURL}));
              //navigate("/browse"); // can't navigate from here, we can't use the useNavigate from outside the router
            } else {
              // User is signed out
              dispatch(removeUser());
            }
          });
    },[]);


    return (
        <div>
           <RouterProvider router={appRouter} />
        </div>
    )
}

export default Body
