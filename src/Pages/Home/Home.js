import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { differenceInCalendarDays, parseISO } from 'date-fns';

const Home = ({rating}) => {

    let ratingDates = [];

    useEffect(() => {
        //create logic to check that it doesnt add the same day twice
        if (rating.date){ 
            ratingDates.push(rating.date) 
        }
    }, [rating.note])

    console.log(ratingDates);


    // const date1 = parseISO('2022-06-05');
    // const date2 = parseISO('2022-06-07');
    // const date3 = parseISO('2022-06-10');
    // const datesToAddClassTo = [date1, date2, date3];

    const isSameDay = (a, b) => {
        return differenceInCalendarDays(a, b) === 0;
    }

    function tileClassName({ date, view }) {
        // Check if a date React-Calendar wants to check is on the list of dates to add class to
        if (ratingDates.find(dDate => isSameDay(dDate, date))) {
            return 'testClass';
        }
    }

    // const [value, setValue] = useState(new Date());

    // return (
    //   <Calendar
    //     onChange={onChange}
    //     value={date}
    //     tileClassName={tileClassName}
    // />
    // );
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