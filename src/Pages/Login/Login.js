import React from 'react'
import { auth, db, googleProvider} from '../../firebase-config'
import {signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

function Login({setAuth, setName}) {
    let navigate = useNavigate();

    const signInWithGoogle = () => {
        /** MOBILE LOGIN CURRENTLY DOES NOT WORK, NEED TO FIX THIS */
        // if (/Mobi/.test(navigator.userAgent)) {
        //     const result = signInWithRedirect(auth, provider).then(async () => {
        //      await getRedirectResult(auth);   
        //     }).then(
        //         navigate('/dailyrating')
        //     )
        //     return;
        // }
        const result = signInWithPopup(auth, googleProvider).then((result) => {
            // localStorage.setItem('isAuth', true);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            console.log(token);
            setAuth(true);
            setName(auth.currentUser?.displayName.split(' ')[0]);
            const setNewUser = async () => {
                await setDoc(doc(db, "users", auth.currentUser.uid), {
                    name: auth.currentUser.displayName,
                    id: auth.currentUser.uid
                  });
            }
            setNewUser();
            //here would probably need to handle logic if they already did the rating
            navigate('/dailyrating');
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(credential);
        })
    };

    return (
    <div className='loginPage fadeIn'>
        <h1 className='introSplash'>Grader Days</h1>
        <h4 className='tagline'>A calendar keeping track of your daily ratings.</h4>
        <button className='login-with-google-btn' onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
    )
}

export default Login;
