import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { differenceInCalendarDays, parseISO } from 'date-fns';

const Home = ({rating}) => {

    const [allRatings, setAllRatings] = useState([]);

    useEffect(() => {
        if (allRatings.length === 0){ 
            setAllRatings([rating])
        } else if (!allRatings.includes(rating)) { 
            setAllRatings(ratings => [...ratings, rating] )
        }  
    }, [rating])

    console.log(allRatings)

    const isSameDay = (rating, calendarDate) => {
        return differenceInCalendarDays(rating.date, calendarDate) === 0;
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

    function onChange(nextValue) {
      setValue(nextValue);
    }
  
    return (
        <div className='calendar-container'>
         <h3 className='dateTitle'>Rafael's Month</h3>
         <Calendar
            onChange={onChange}
            value={value}
            tileClassName={tileClassName}
            maxDetail={'month'}
            minDetail={'month'}
         />
        </div>
    );
}

export default Home;