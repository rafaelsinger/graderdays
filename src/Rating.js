import React, { useState, useEffect, useRef } from 'react';
import RatingButton from './RatingButton'

const Rating = () => {
    const [rating, setRating] = useState({text: '', color: null})
    const [active, setActive] = useState(false);
    const [selected, setSelected] = useState(null);
    const [displayBox, setDisplayBox] = useState(false);

    useEffect(() => {
        if (selected){
            setTimeout(() => {
                setDisplayBox(true);
            }, 390)
        }
    }, [selected])

    const day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const currentDay = day[(new Date()).getDay()];
    let currentDate = (new Date()).toDateString().split(' ').slice(1);
    currentDate[1] = currentDate[1] + ','
    currentDate = currentDate.join(' ');

    return (
        <div className='wrapper'>
            <div className='rating-container' style={active?{border: `3px solid ${rating.color}`}:{}} >
                <h3 className='dateTitle'>Rafael's {currentDay}</h3>
                <h4 className='dateSubtitle'>{currentDate}</h4> 
                <div className='rating-box'>My day was<span style={{color: rating.color}}>&nbsp;{rating.text}</span></div>
                    <div className='buttom-select-menu'>
                        <RatingButton name={'Amazing'} color={'#006d05'} setRating={setRating} setActive={setActive} setSelected={setSelected} selected={selected} setDisplayBox={setDisplayBox} />
                        <RatingButton name={'Great'} color={'#3d8532'} setRating={setRating} setActive={setActive} setSelected={setSelected} selected={selected} setDisplayBox={setDisplayBox} />
                        <RatingButton name={'Good'} color={'#88b77b'} setRating={setRating} setActive={setActive} setSelected={setSelected} selected={selected} setDisplayBox={setDisplayBox} />
                        <RatingButton name={'Okay'} color={'#E5D50F'} setRating={setRating} setActive={setActive} setSelected={setSelected} selected={selected} setDisplayBox={setDisplayBox} />
                        <RatingButton name={'Bad'} color={'#D66C65'} setRating={setRating} setActive={setActive} setSelected={setSelected} selected={selected} setDisplayBox={setDisplayBox} />
                        <RatingButton name={'Awful'} color={'#A83030'} setRating={setRating} setActive={setActive} setSelected={setSelected} selected={selected} setDisplayBox={setDisplayBox} />
                        <RatingButton name={'Horrible'} color={'#7d0600'} setRating={setRating} setActive={setActive} setSelected={setSelected} selected={selected} setDisplayBox={setDisplayBox} />
                    </div>
                    {displayBox && <div className='notebox'></div>}
            </div>
        </div>
    )
}

export default Rating;