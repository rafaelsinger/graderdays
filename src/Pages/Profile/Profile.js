import { collection, getDocs } from 'firebase/firestore'
import React, {useEffect, useState, useMemo} from 'react'
import { db, auth } from '../../firebase-config'
import { useLocalStorage } from '../../useLocalStorage';
import { onAuthStateChanged } from 'firebase/auth';
import Logout from '../Home/Logout'

export default function Profile({setAuth, setName, name}) {

    const [totalRatings, setTotalRatings] = useLocalStorage('totalRatings', 0);
    const [goodStreak, setGoodStreak] = useLocalStorage('goodStreak', {});
    
    // const [longestGoodStreak, setLongestGoodStreak] = useLocalStorage('goodStreak', {streak: 0});
    // const [g, setCurrGoodStreak] = useState(0); 
    // const [maxGoodStreak, setMaxGoodStreak] = useState(0);
    const [currDay, setCurrDay] = useState((new Date).getDay());

    useEffect(() => {
        document.title = 'Profile | Grader Days'
        setCurrDay(new Date((new Date).getDay()));
        onAuthStateChanged(auth, () => {
          getNumberOfRatings();
          getLongestGoodStreak();
        })
        // !not_in_db ? getLongestGoodStreak(); : getStreakFromDB;
    }, [])

    const getLongestGoodStreak = async () => { 
      const options = { weekday: 'narrow', year: 'numeric', month: 'long', day: 'numeric' };
      const q = await getDocs(collection(db, "users", auth.currentUser.uid, "dailyratings")); //getDocs(collection(db, "users", auth.currentUser.uid, "dailyratings"));
      const dateRatingArr = [];
      q.forEach(doc => {
        dateRatingArr.push({date: doc.data().rating.date.toDate(), rating: doc.data().rating.text.replace('.','')});
      })
      dateRatingArr.sort(function(a,b){
        return new Date(a.date) - new Date(b.date);
      });
      let currStreak = 0;
      let startDate = null;
      let last = dateRatingArr[dateRatingArr.length-1];
      const maxStreak = {streak: 0, start_date: null, end_date: null};
      for (const obj of dateRatingArr){
        if (obj.rating === 'good' || obj.rating === 'great' || obj.rating === 'amazing'){
          if (currStreak === 0){
            startDate = obj.date;
          }
          currStreak++; 
          if (obj === last){
            if (currStreak >= maxStreak.streak){
              maxStreak.start_date = startDate.toLocaleDateString('en-US', options).split(' ').slice(1).join(' ');
              maxStreak.end_date = obj.date.toLocaleDateString('en-US', options).split(' ').slice(1).join(' ');  
              maxStreak.streak = currStreak;
            }           
          }
        } else {
          if (currStreak >= maxStreak.streak){
            maxStreak.start_date = startDate.toLocaleDateString('en-US', options).split(' ').slice(1).join(' ');
            maxStreak.end_date = obj.date.toLocaleDateString('en-US', options).split(' ').slice(1).join(' ');
            maxStreak.streak = currStreak;
          }
          currStreak = 0;
        }
      }
      setGoodStreak(maxStreak);
    }
    
    const getNumberOfRatings = async () => {
      const q = await getDocs(collection(db, "users", auth.currentUser?.uid, "dailyratings"));
      setTotalRatings(q._snapshot.docChanges.length);
    }
  return (
    <div className='profile-container'>
        <div className='profile-info'>
            <h1>{name}</h1>
            <div className='profile-feature'>
              <h2 className='profile-feature-label'>Total Ratings: </h2>
              <h2 className='profile-feature-contents'> {totalRatings} </h2>
            </div>
            <div className='profile-feature'>
              <h2 className='profile-feature-label'>Longest Streak of Positive Days: </h2>
              <h2 className='profile-feature-contents'> <span>{goodStreak.streak}</span> <span>({goodStreak.start_date}</span> - <span>{goodStreak.end_date})</span> </h2>
            </div>
            <div className='profile-feature'>
              <h2 className='profile-feature-label'>Log Out: </h2>
              <Logout setAuth={setAuth} setName={setName} />
            </div>
        </div>
    </div>
  )
}
