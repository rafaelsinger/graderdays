import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { differenceInCalendarDays, parseISO } from 'date-fns';
import { auth, db } from '../../firebase-config';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';
import RatingModal from './RatingModal';
import { query, getDocs, getDoc, collection, where, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Loading from '../Loading';
import { useLocalStorage } from '../../useLocalStorage';

const Home = ({rating, name, setAuth, setName, setRating}) => {

    const [allRatings, setAllRatings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);    

    useEffect(() => {
        document.title = 'Home | Grader Days';
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
                setAllRatings((ratings) => [...ratings, doc.data()]) 
            })
            setIsLoading(false); //SHOULD BE FALSE
        } catch (err) {
            setIsLoading(false);
            console.error(err);
        }   
    }

    const getMonth = (date) => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return monthNames[date.getMonth()]
    }

    const onActiveStartDateChange = (e) => {
        setMonth(getMonth(e.activeStartDate));
    }

    const [month, setMonth] = useState(getMonth(new Date()));
    
    const isSameDay = (rating, calendarDate) => {
        return differenceInCalendarDays(rating.rating.date?.toDate(), calendarDate) === 0;
    }

    const tileClassName = ({date}) => {
        const foundRating = allRatings.find(rating => isSameDay(rating, date));
        if (foundRating){
            return `${foundRating.rating.text.replace('.','')} rating`
        }
    }

    const [value, setValue] = useState(new Date());
    const [modalIsOpen, setIsOpen] = useState(false);
    const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
    const [passedData, setPassedData] = useState('');

    function onChange(nextValue) {
        setValue(nextValue);
        const date = nextValue.toDateString();

        const inDatabase = async (date) => {
            const q = await getDoc(doc(db, "users", auth.currentUser?.uid, "dailyratings", date));
            if (q.data()) { 
                setPassedData(q.data());
                modalIsOpen ? setIsOpen(false) : setIsOpen(true); 
            } else {
                setPassedData(null);
                modalIsOpen ? setIsOpen(false) : setIsOpen(true); 
            }
        }

        inDatabase(date);
    }

  
    return (
        <>
            {isLoading ? <Loading /> : <div className='calendar-container'>
                <h3 className='dateTitle'>{name}'s {month}</h3>
                <Calendar
                    onChange={(e) => onChange(e)}
                    value={value}
                    onActiveStartDateChange={e => onActiveStartDateChange(e)}
                    tileClassName={tileClassName}
                    maxDetail={'month'}
                    minDetail={'month'}
                />
                <RatingModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} date={value} data={passedData} setPassedData={setPassedData} rating={rating} setRating={setRating} />
            </div> }
        </>
    );
}

export default Home;