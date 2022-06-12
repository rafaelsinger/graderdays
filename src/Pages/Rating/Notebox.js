import { doc, setDoc } from 'firebase/firestore';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase-config';

const Notebox = ({rating, setRating, modal}) => {
    // const ratingsCollectionRef = collection(db, 'users').doc()
    let navigate = useNavigate();
    const addRating = async () => {
        const curr = (new Date).toDateString();
        await setDoc(doc(db, "users", auth.currentUser.uid, "dailyratings", curr), {
                rating: rating, 
            })
        navigate('/home')
    }
    return (
        <div className='notebox'>
            <textarea className={modal ? 'notetext notetext-modal' : 'notetext'} onChange={(e) => setRating({...rating, note: e.target.value}) } style={{border: 'none'}} placeholder="Leave a note about your day." autoFocus></textarea>
            <button type="submit" className='notesubmit' onClick={addRating}>submit</button>
        </div>
    )
}

export default Notebox;