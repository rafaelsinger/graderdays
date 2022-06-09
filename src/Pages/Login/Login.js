import React from 'react'
import { auth, db, provider } from '../../firebase-config'
import {signInWithPopup, signInWithRedirect, getRedirectResult} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

function Login({setAuth}) {

    let navigate = useNavigate();

    const signInWithGoogle = async () => {
        /** MOBILE LOGIN CURRENTLY DOES NOT WORK, NEED TO FIX THIS */
        if (/Mobi/.test(navigator.userAgent)) {
            const result = await signInWithRedirect(auth, provider);
            await getRedirectResult(auth);
                //do some redirect to other page
                return;
        }
        const result = signInWithPopup(auth, provider).then(() => {
            // localStorage.setItem('isAuth', true);
            setAuth(true);
            const setNewUser = async () => {
                await setDoc(doc(db, "users", auth.currentUser.uid), {
                    name: auth.currentUser.displayName,
                  });
            }
            setNewUser();
            //here would probably need to handle logic if they already did the rating
            navigate('/dailyrating');
        })
    };

    return (
    <div className='loginPage fadeIn'>
        <h1 className='introSplash'>Grader Days</h1>
        <button className='login-with-google-btn' onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
    )
}

export default Login;
