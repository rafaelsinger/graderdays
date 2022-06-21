import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    let navigate = useNavigate();
    return (
        <div className='calendar-container'>
            <h1>Error 404:</h1>
            <h2>Page not found.</h2>
            <button className={'errorButton'} onClick={() => { navigate('/') } }>Go Home</button>
        </div>
    )
}   

export default ErrorPage;