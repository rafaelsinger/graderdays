import React from 'react';
import { useNavigate } from 'react-router-dom';

const Notebox = ({rating, setRating}) => {
    let navigate = useNavigate();
    return (
        <div className="notebox">
            <textarea className='notetext' onChange={(e) => setRating({...rating, note: e.target.value}) } style={{border: 'none'}} placeholder="Leave a note about your day." autoFocus></textarea>
            <button type="submit" className='notesubmit' onClick={() => { navigate('/home') }}>submit</button>
        </div>
    )
}

export default Notebox;