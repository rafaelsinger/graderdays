import React, {useEffect, useState} from 'react'
import Modal from 'react-modal';
import Notebox from '../Rating/Notebox'
import ViewRating from './ViewRating'

Modal.setAppElement('#root'); //#root

const RatingModal = ({modalIsOpen, setIsOpen, date, rating, setRating, data, setPassedData}) => {

    const [clicked, setClicked] = useState(false);
    const [placeholder, setPlaceholder] = useState(null);

    function openModal() {
        setIsOpen(true);
      }
    
    
      function closeModal() {
          setIsOpen(false);
          setTimeout(() => {
            setClicked(false);
        }, 500)
      }
    
    const day = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentDay = day[date.getDay()];
    let currentDate = (date.toDateString().split(' ').slice(1));
    currentDate[0] = monthNames[(new Date()).getMonth()];
    if (currentDate[1] < 10){ currentDate[1] = currentDate[1].slice(1) }
    currentDate[1] = currentDate[1] + ','
    currentDate = currentDate.join(' ');

    const handleButtonClick = (e) => {
        const text = `${e.target.textContent.toLowerCase()}.`
        setRating({text: text, date: date});
        setClicked(true);
    }

    return (
        <Modal 
            className='rating-modal'
            overlayClassName='rating-modal-overlay'
            closeTimeoutMS={200}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel='Rating Modal'
        >
            <div className='modal-content-container'>
                <button className='close' onClick={closeModal}></button>
                <h2 className='dateTitle' style={{margin: 0}}>{currentDay}</h2>
                <h4 className='dateSubtitle' style={{width: '50%', textAlign: 'center', alignSelf: 'center'}}>{currentDate}</h4>
                <div className={clicked ? 'hide' : 'button-container'}>
                    {data ? <ViewRating data={data} setPlaceholder={setPlaceholder} setPassedData={setPassedData} /> : <>
                        <button tabIndex='0' className='option in-modal' style={{backgroundColor: '#006d05'}} onClick={e => handleButtonClick(e)}>Amazing</button>
                        <button className='option in-modal' style={{backgroundColor: '#3d8532'}} onClick={e => handleButtonClick(e)}>Great</button>
                        <button className='option in-modal' style={{backgroundColor: '#88b77b'}} onClick={e => handleButtonClick(e)}>Good</button>
                        <button className='option in-modal' style={{backgroundColor: '#F9E076'}} onClick={e => handleButtonClick(e)}>Okay</button>
                        <button className='option in-modal' style={{backgroundColor: '#D66C65'}} onClick={e => handleButtonClick(e)}>Bad</button>
                        <button className='option in-modal' style={{backgroundColor: '#A83030'}} onClick={e => handleButtonClick(e)}>Awful</button>
                        <button className='option in-modal' style={{backgroundColor: '#7d0600'}} onClick={e => handleButtonClick(e)}>Horrible</button>
                    </>}
                </div>
                <div className={clicked ? 'show' : 'hide'}>
                    <Notebox rating={rating} setRating={setRating} modal={{date: date, bool: true, setIsOpen: setIsOpen}} placeholder={placeholder} />
                </div>
            </div>
        </Modal>
    )
}

export default RatingModal