import React, { useState } from 'react';

const RatingButton = ({name, color, setRating, setActive, setSelected, selected, setDisplayBox}) => {

    const highlight = (e) => {
        setActive(true);
        e.target.style.backgroundColor = color;
        e.target.style.color = 'white'
        e.target.style.fontWeight = 'bold'
    }

    const clickHandler = (e) => {
        if (!selected){
            setSelected(true);
            highlight(e);
            // e.target.hidden = true;
        }
    }

    const enterHandler = (e) => {
        if (!selected && e.key === 'Enter'){
            setSelected(true);
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

    const handleTransitionEnd = (e) => {
        if (selected){
            e.target.style.display = 'none';
        }
    }

    return (
        <button className={selected?`option fade-out`:'option'} onTransitionEnd={e => handleTransitionEnd(e)} onClick={(e) => clickHandler(e)} onMouseOver={(e) => mouseOverHandler(e)} onKeyDown={e => enterHandler(e)} onMouseLeave={e => mouseLeaveHandler(e)} onFocus={e => mouseOverHandler(e)} onBlur={e => mouseLeaveHandler(e)} 
        style={{borderColor: color}} >
            {name}
        </button>
    )
}

export default RatingButton;