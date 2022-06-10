import React, {useState} from 'react'
import Modal from 'react-modal';

Modal.setAppElement('#root');

const RatingModal = ({modalIsOpen, setIsOpen, date}) => {

    function openModal() {
        setIsOpen(true);
      }
    
    
      function closeModal() {
        setIsOpen(false);
      }
    
    const day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentDay = day[date.getDay()];
    let currentDate = (date.toDateString().split(' ').slice(1));
    currentDate[0] = monthNames[(new Date()).getMonth()];
    if (currentDate[1] < 10){ currentDate[1] = currentDate[1].slice(1) }
    currentDate[1] = currentDate[1] + ','
    currentDate = currentDate.join(' ');

    return (
        <Modal 
            className='rating-modal'
            closeTimeoutMS={200}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel='Rating Modal'
        >
            <div className='modal-content-container'>
                <button className='close' onClick={closeModal}></button>
                <h2 className='dateTitle' style={{margin: 0}}>{currentDay}</h2>
                <h4 className='dateSubtitle' style={{width: '50%', textAlign: 'center', alignSelf: 'center'}}>{currentDate}</h4>
            </div>
        </Modal>
    )
}

export default RatingModal

/**
 * TODO: format the modal so that it looks like the sketch
 * TODO: make the modal functional, use RatingButton components, and submits to the DB
 */