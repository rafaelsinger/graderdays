import React from 'react'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';

function Logout({setAuth, setName}) {
    let navigate = useNavigate();

    const signUserOut = () => {
        const result = signOut(auth).then(() => {
            setName('');
            setAuth(false);
            navigate('/login');
        });
    }

    return (
        <button onClick={signUserOut}>sign out</button>
    )
}

export default Logout