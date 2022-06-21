import React, { useContext } from 'react';
import { auth, db } from '../../firebase-config';
import { deleteDoc, doc} from 'firebase/firestore';
import { DayRatingContext } from '../../DayRatingContext';
import { useNavigate } from 'react-router-dom';

const ViewRating = ({data, setPlaceholder, setPassedData, placeholder}) => {

    const date = data.rating?.date.toDate();
    const setDidDayRating = useContext(DayRatingContext);
    let navigate = useNavigate();

    const rating = `${data.rating?.text.replace('.','')}`
    let displayRating = `A ${rating} day.`
    if (rating === 'amazing' || rating === 'awful' || rating === 'okay'){
        displayRating = `An ${rating} day.`
    }
    const note = data.rating?.note;

    const handleEdit = () => {
        setPassedData(null);
        setPlaceholder(note);
    }

    const handleDelete = async () => {
        const dateDoc = date.toDateString();
        const ratingDoc = doc(db, 'users', auth.currentUser.uid, 'dailyratings', dateDoc)
        await deleteDoc(ratingDoc);
        if (dateDoc === (new Date).toDateString()){
            setDidDayRating(false);
        }
        window.location.reload();
        navigate('/home');
    }

    return (
        <>
            <h2 className='displayRating'>{displayRating}</h2>
            {note ? <textarea className='notetext notetext-modal' value={note} disabled></textarea> : <></>}
            <button onClick={handleEdit} className={'footer-modal edit notesubmit'}>edit</button>
            <button onClick={handleDelete} className={'footer-modal delete notesubmit'}>delete</button>
        </>
    )
}

export default ViewRating;