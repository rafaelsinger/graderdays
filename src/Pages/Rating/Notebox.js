import { doc, addDoc, collection } from 'firebase/firestore';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase-config';

const Notebox = ({rating, setRating}) => {
    // const ratingsCollectionRef = collection(db, 'users').doc()
    let navigate = useNavigate();
    const addRating = async () => {
        await addDoc(collection(db, "users", auth.currentUser.uid, "dailyratings"), {
            rating: rating,
        })
        navigate('/home')
    }
    return (
        <div className="notebox">
            <textarea className='notetext' onChange={(e) => setRating({...rating, note: e.target.value}) } style={{border: 'none'}} placeholder="Leave a note about your day." autoFocus></textarea>
            <button type="submit" className='notesubmit' onClick={addRating}>submit</button>
        </div>
    )
}

export default Notebox;