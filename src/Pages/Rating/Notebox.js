import { doc, setDoc } from 'firebase/firestore';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase-config';

const Notebox = ({rating, setRating, modal}) => {
    // const ratingsCollectionRef = collection(db, 'users').doc()
    let navigate = useNavigate();
    const addRating = async () => {
        let date = (new Date).toDateString();
        if (modal.bool){
            date = modal.date.toDateString();
        }
        await setDoc(doc(db, "users", auth.currentUser.uid, "dailyratings", date), {
                rating: rating, 
            })
        if (modal.bool){
            modal.setIsOpen(false); 
            window.location.reload();
        } else {
            navigate('/home')
        }
    }
    return (
        <div className='notebox'>
            <textarea className={modal.bool ? 'notetext notetext-modal' : 'notetext'} onChange={(e) => setRating({...rating, note: e.target.value}) } style={{border: 'none'}} placeholder="Leave a note about your day." autoFocus></textarea>
            <button type="submit" className='notesubmit' onClick={addRating}>submit</button>
        </div>
    )
}

export default Notebox;