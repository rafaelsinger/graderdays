import { collection, getDocs } from 'firebase/firestore'
import React, {useEffect, useState} from 'react'
import { db, auth } from '../../firebase-config'
import { useLocalStorage } from '../../useLocalStorage';
import Logout from '../Home/Logout'

export default function Profile({setAuth, setName, name}) {

    const [totalRatings, setTotalRatings] = useLocalStorage('totalRatings', 0);

    useEffect(() => {
        document.title = 'Profile | Grader Days'
        getNumberOfRatings();
    }, [])
    
    const getNumberOfRatings = async () => {
      const q = await getDocs(collection(db, "users", auth.currentUser.uid, "dailyratings"));
      setTotalRatings(q._snapshot.docChanges.length);
    }
  return (
    <div className='profile-container'>
        <div className='profile-info'>
            <h1>{name}</h1>
            <div className='profile-feature'>
              <h2 className='profile-feature-label'>Total Ratings: </h2>
              <h2> {totalRatings} </h2>
            </div>
            <div className='profile-feature'>
              <h2 className='profile-feature-label'>Log Out: </h2>
              <Logout setAuth={setAuth} setName={setName} />
            </div>
        </div>
    </div>
  )
}
