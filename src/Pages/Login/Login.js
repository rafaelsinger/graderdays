import React from 'react'
import { auth, db, provider } from '../../firebase-config'
import {signInWithPopup, signInWithRedirect, getRedirectResult} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
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
        const result = signInWithPopup(auth, provider).then(() => {
            // localStorage.setItem('isAuth', true);
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
