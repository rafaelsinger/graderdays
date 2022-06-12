import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import { auth, db } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';
import RatingModal from './RatingModal';
import { query, getDocs, collection, where, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Loading from '../Loading';

const Home = ({rating, name, setAuth, setName, setRating}) => {

    const [allRatings, setAllRatings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        onAuthStateChanged(auth, (user) => {
            if (user){
                fetchData(user);
            } 
        })
    }, [])


    const fetchData = async (user) => {
        try{
            const q = await getDocs(collection(db, "users", user.uid, "dailyratings"));
            q.forEach((doc) => {
                // if (allRatings.length === 0 && !allRatings.includes(doc.data())){ 
                setAllRatings((ratings) => [...ratings, doc.data()]) 
                // }
                //     setAllRatings([doc.data()])
                // } else if (!allRatings.includes(doc.data().date)){ 
                //     setAllRatings(ratings => [...ratings, doc.data()] )
                // }  
            })
            setIsLoading(false);
        } catch (err) {
            //eventually have proper error message page
            setIsLoading(false);
            console.error(err);
        }   
        // const doc = await getDocs(q);
        // const data = q.docs[0].data();
        // console.log(data);
    }
    // console.log(allRatings);


    /*
    *STRUCTURE OF THE RATING OBJECT FROM FIRESTORE:
        rating:
        color: "#006d05"
        date: at {seconds: 1654846611, nanoseconds: 893000000}
        note: "IT WAS AMAZING"
        text: "amazing."
    */

    // console.log(allRatings);

    // useEffect(() => {
    //     if (allRatings.length === 0){ 
    //         setAllRatings([rating])
    //     } else if (!allRatings.includes(rating)) { 
    //         setAllRatings(ratings => [...ratings, rating] )
    //     }  
    // }, [rating])

    const isSameDay = (rating, calendarDate) => {
        return differenceInCalendarDays(rating.rating.date?.toDate(), calendarDate) === 0;
    }

    const tileClassName = ({date}) => {
        const foundRating = allRatings.find(rating => isSameDay(rating, date));
        if (foundRating){
            return `${foundRating.rating.text.replace('.','')} rating`
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
            
            {isLoading ? <Loading /> : <div className='calendar-container'>
                <h3 className='dateTitle'>{name}'s Month</h3>
                <Calendar
                    onChange={(e) => onChange(e)}
                    value={value}
                    tileClassName={tileClassName}
                    maxDetail={'month'}
                    minDetail={'month'}
                />
                <RatingModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} date={value} rating={rating} setRating={setRating} />
            </div> }
        </>
    );
}

export default Home;