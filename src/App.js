import React, { useState } from 'react';
import Rating from './Pages/Rating/Rating'
import Home from './Pages/Home/Home'
import ErrorPage from './Pages/Error/ErrorPage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  const [value, onChange] = useState(new Date());
  const [rating, setRating] = useState({text: '', color: null, date: null, note: ''})

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Rating rating={rating} setRating={setRating} />} />
        <Route path='/home' element={<Home rating={rating} />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Router>
    // {/* <div className="App">
    //   {/* <Calendar onChange={onChange} value={value} defaultView={'day'}/> */}
    //   <Rating />
    // </div> */}
  );
}

export default App;
