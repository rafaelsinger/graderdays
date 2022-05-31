import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import RatingButton from './RatingButton'

const Rating = () => {
    const [rating, setRating] = useState({text: '', color: null})
    const [active, setActive] = useState(false);

    const textRef = useRef(null);

    useEffect(() => {
        if (rating.color){
            setActive(true);
        } else {
            setActive(false);
        }
    }, [rating]);

    const day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const currentDay = day[(new Date()).getDay()];
    let currentDate = (new Date()).toDateString().split(' ').slice(1);
    currentDate[1] = currentDate[1] + ','
    currentDate = currentDate.join(' ');

    return (
        <div className='wrapper'>
            <div className='rating-container' style={{borderColor: rating.color}} >
                <h3 className='dateTitle'>Rafael's {currentDay}</h3>
                <h4 className='dateSubtitle'>{currentDate}</h4> 
                <div className='rating-box'>My day was <CSSTransition ref={textRef} in={active} timeout={500} classNames='rating-text'><span ref={textRef} style={{color: rating.color}}>&nbsp;{rating.text}</span></CSSTransition></div>
                    <div className='buttom-select-menu'>
                        <RatingButton name={'Amazing'} color={'#33691E'} setRating={setRating}  />
                        <RatingButton name={'Very Good'} color={'#168039'} setRating={setRating} />
                        <RatingButton name={'Good'} color={'#96ED89'}setRating={setRating} />
                        <RatingButton name={'Okay'} color={'#BEEB9F'} setRating={setRating} />
                        <RatingButton name={'Bad'} color={'#ef5350'} setRating={setRating}  />
                        <RatingButton name={'Very Bad'} color={'#D40D12'} setRating={setRating} />
                        <RatingButton name={'Horrible'} color={'#450003'} setRating={setRating} />
                    </div>
            </div>
        </div>
    )
}

export default Rating;