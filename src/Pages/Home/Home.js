import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import { auth, db } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';
import RatingModal from './RatingModal';
import { query, getDocs, collection, where, doc } from 'firebase/firestore';

const Home = ({rating, name, setAuth, setName}) => {

    const [allRatings, setAllRatings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const q = await getDocs(collection(db, "users", auth.currentUser?.uid, "dailyratings"));
            q.forEach((doc) => {
                if (allRatings.length === 0){ 
                    setAllRatings([doc.data()])
                } else if (!allRatings.includes(doc.data().date)){ 
                    setAllRatings(ratings => [...ratings, doc.data()] )
                }  
            })
            // const doc = await getDocs(q);
            // const data = q.docs[0].data();
            // console.log(data);
        }
        fetchData();
        // console.log(fetchData());
    }, [])

    console.log(allRatings);

    // useEffect(() => {
    //     if (allRatings.length === 0){ 
    //         setAllRatings([rating])
    //     } else if (!allRatings.includes(rating)) { 
    //         setAllRatings(ratings => [...ratings, rating] )
    //     }  
    // }, [rating])

    const isSameDay = (rating, calendarDate) => {
        // return differenceInCalendarDays(rating?.date.toDateString(), calendarDate) === 0;
        return;
    }

    const tileClassName = ({date}) => {
        const foundRating = allRatings.find(rating => isSameDay(rating, date));
        if (foundRating){
            return `${foundRating.text.replace('.','')} rating`
        }
    }

    // const [ratings, setRatings] = useState([]);

    // useEffect(() => {
    //     const data = localStorage.getItem('ratings');
    //     if (data){
    //         const stringRatings = JSON.parse(data);
    //         console.log('i should be setting to ', stringRatings)
    //         setRatings(stringRatings);
    //     }
    // }, [])

    // console.log(ratings)

    // useEffect(() => {
    //     if (ratings.length === 0){
    //         setRatings([...ratings, rating])
    //     } else if (ratings[ratings.length-1].date !== rating.date && rating.date !== null){
    //         setRatings([...ratings, rating])
    //     }
    // }, [rating])


    // useEffect(() => {
    //     if (ratings.length > 0 && ratings[0].date !== null){
    //         localStorage.setItem('ratings', JSON.stringify(ratings))
    //     }
    // }, [ratings])

    // function tileClassName({ date }) {
    //     // Check if a date React-Calendar wants to check is on the list of dates to add class to
    //     console.log(date.getDay());
    //     console.log(ratings[0])
    //     // console.log(ratings[0].date)
    //     const hasDate = ratings.hasOwnProperty(parseISO(date));
    //     console.log(hasDate);
    //     // const currRating = 
    //     // if (ratings.find(dDate => isSameDay(dDate, date))) {
    //     //     // const grade = dates.find(date => isSameDay(date, ratings));
    //     //     // console.log(grade);
    //     //     return 'testClass';
    //     // }
    // }

    // function tileClassName({date}){
    //     return;
    // }

    const [value, setValue] = useState(new Date());
    const [modalIsOpen, setIsOpen] = useState(false);

    let navigate = useNavigate();

    function onChange(nextValue) {
        setValue(nextValue);
        modalIsOpen ? setIsOpen(false) : setIsOpen(true); 
    }
  
    return (
        <>
            <div className='options-container'>
                <Logout setAuth={setAuth} setName={setName} />
                <div>profile</div>
            </div>
            <div className='calendar-container'>
                <h3 className='dateTitle'>{name}'s Month</h3>
                <Calendar
                    onChange={(e) => onChange(e)}
                    value={value}
                    tileClassName={tileClassName}
                    maxDetail={'month'}
                    minDetail={'month'}
                />
                <RatingModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} date={value} />
            </div>
        </>
    );
}

export default Home;