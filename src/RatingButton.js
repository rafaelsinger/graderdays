import React, { useState } from 'react';

const RatingButton = ({name, color, setRating, setActive, setSelected, selected}) => {

    const highlight = (e) => {
        setActive(true);
        e.target.style.backgroundColor = color;
        e.target.style.color = 'white'
        e.target.style.fontWeight = 'bold'
    }

    const clickHandler = (e) => {
        if (!selected){
            setSelected({name: name, color: color});
            highlight(e);
        }
    }

    const enterHandler = (e) => {
        if (!selected && e.key === 'Enter'){
            setSelected({name: name, color: color});
            highlight(e);
        }
    }
    
    const mouseOverHandler = (e) => {
        if (!selected){
            highlight(e);
            setRating({text: `${name.toLowerCase()}.`, color: color});
        }
    }
    
    const mouseLeaveHandler = (e) => {
        if (!selected){
            setActive(false);
            e.target.style.backgroundColor = 'white';
            e.target.style.color = 'black'
            e.target.style.fontWeight = ''
            setRating({text: '', color: null})         
        }
    }

    return (
        <button className={`option`} onClick={(e) => clickHandler(e)} onMouseOver={(e) => mouseOverHandler(e)} onKeyDown={e => enterHandler(e)} onMouseLeave={e => mouseLeaveHandler(e)} onFocus={e => mouseOverHandler(e)} onBlur={e => mouseLeaveHandler(e)} 
        style={{borderColor: color}} >
            {name}
        </button>
    )
}

export default RatingButton;