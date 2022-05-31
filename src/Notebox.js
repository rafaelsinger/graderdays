import React from 'react';

const Notebox = () => {
    
    return (
        <div className="notebox">
            <textarea className='notetext' style={{border: 'none'}} placeholder="Leave a note about your day." autoFocus></textarea>
            <button type="submit" className='notesubmit'>submit</button>
        </div>
    )
}

export default Notebox;