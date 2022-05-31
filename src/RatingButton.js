import React, { useState } from 'react';

const RatingButton = ({name, color, setRating}) => {

    const [active, setActive] = useState();

    const clickHandler = (event) => {
        console.log(event);
    }
    
    const mouseOverHandler = (e) => {
        setActive('active');
        setRating({text: `${name.toLowerCase()}.`, color: color});
    }
    
    const mouseLeaveHandler = () => {
        setActive('inactive');
        setRating({text: '', color: null})
    }

    return (
        <button className={`option ${active}`} onClick={clickHandler} onMouseOver={(e) => mouseOverHandler(e)} onMouseLeave={mouseLeaveHandler} 
        style={{borderColor: color}}>
            {name}
        </button>
    )
}

export default RatingButton;