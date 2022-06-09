import React from 'react'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';

function Logout({setAuth}) {
    let navigate = useNavigate();

    const signUserOut = () => {
        const result = signOut(auth).then(() => {
            setAuth(false);
            navigate('/login');
        });
    }

    return (
        <button onClick={signUserOut}>sign out</button>
    )
}

export default Logout