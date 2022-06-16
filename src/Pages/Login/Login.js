import {React, useContext, useEffect} from 'react'
import { auth, db, googleProvider} from '../../firebase-config'
import {signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider, setPersistence, browserSessionPersistence } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { addDoc, collection, doc, setDoc, getDoc} from 'firebase/firestore';
import { DayRatingContext } from '../../DayRatingContext';

function Login({setAuth, setName}) {
    useEffect(() => {
        document.title = 'Login | Grader Days'
    }, [])
    let navigate = useNavigate();

    const setDidDayRating = useContext(DayRatingContext);

    const signInWithGoogle = () => {
        const setNewUser = async () => {
            setAuth(true);
            setName(auth.currentUser?.displayName.split(' ')[0]);
            await setDoc(doc(db, "users", auth.currentUser.uid), {
                name: auth.currentUser.displayName,
                id: auth.currentUser.uid
              });
        }
        /** MOBILE LOGIN CURRENTLY DOES NOT WORK, NEED TO FIX THIS */
        // if (/Mobi/.test(navigator.userAgent)) {
        //     const result = signInWithRedirect(auth, googleProvider).then(async () => {
        //      await getRedirectResult(auth);   
        //     }).then(() => {
        //         setNewUser();
        //         navigate('/dailyrating')
        //     })
        //     return;
        // }
        const result = signInWithPopup(auth, googleProvider).then((result) => {
            // localStorage.setItem('isAuth', true);
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            setNewUser();

            /** LOGIC FOR HANDLING ROUTING IF THEY ALREADY DID THE RATING */
            const curr = new Date().toDateString(); 
            const inDatabase = async (date) => {
                const q = await getDoc(doc(db, "users", auth.currentUser?.uid, "dailyratings", date));
                if (q.data()) { 
                    setDidDayRating(true);
                    navigate('/home')
                } else {
                    setDidDayRating(false);
                    navigate('/dailyrating');
                }
            }
            inDatabase(curr);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // console.log(credential);
        })
    };

    return (
    <div className='loginPage fadeIn'>
        <h1 className='introSplash'>Grader Days</h1>
        <h4 className='tagline'>Visualize your change.</h4>
        <button className='login-with-google-btn' onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
    )
}

export default Login;
