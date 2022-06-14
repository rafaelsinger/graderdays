import React, { useState, useEffect } from 'react';
import Rating from './Pages/Rating/Rating'
import Home from './Pages/Home/Home'
import ErrorPage from './Pages/Error/ErrorPage'
import Login from './Pages/Login/Login'
import {BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import {db, auth as authenticated} from './firebase-config'
import { signOut } from 'firebase/auth'
import { collection, getDoc, doc } from 'firebase/firestore'
import { useLocalStorage } from './useLocalStorage';
import { ProtectedRoutes } from './ProtectedRoutes';
import { DayRatingContext } from './DayRatingContext';

function App() {
  const [value, onChange] = useState(new Date());
  const [rating, setRating] = useState(null); //{text: '', color: null, date: null, note: ''}
  const [auth, setAuth] = useLocalStorage('auth', false);
  const [name, setName] = useLocalStorage('name', '');
  const [didDayRating, setDidDayRating] = useLocalStorage('day-rate', false);

  console.log(rating);

  /**
   * TODO: fix focus on edit modal so tab works over edit/delete buttons.
   * ! ALL TO DO'S SO FAR
   * TODO: fix authentication, create sessions that expire using the token that is created on login
   * TODO: fix mobile login with the redirect instead of popup
   * TODO: add styling to each day to show if there's a note (little triangle in the top left, manilla)
   * TODO: build dark mode
   * TODO: build profile page showing total ratings, streaks, other interesting info
   * TODO: update home page so it says specific month, not just "Name's Month" but like "Rafael's June"
   * ...
   * TODO: media queries, make sure it looks good on mobile and tablet
    */

  //MAKE A USE AUTH HOOK AND USE FIREBASE

  /** HANDLE SIGN OUT LOGIC, NEED TO ADDRESS REDIRECTION TO LOGIN PAGE */
  //********************************************************************* */
  //need to fix rerouting logic depending on if they submitted a rating or not, maybe doing it depending on status of submit button in RatingButton

  // <Route path='/' element={auth ? <Navigate to='/dailyrating' /> : <Navigate to='/login' />} />

  return (
    <DayRatingContext.Provider value={setDidDayRating}>
      <Router>
        <Routes>
            <Route path='/' element={auth ? <Navigate to="/dailyrating" /> : <Navigate to='/login' />} />
            <Route path='/login' element={auth ? <Navigate to='/dailyrating' /> : <Login setAuth={setAuth} setName={setName} />} />
            <Route element={<ProtectedRoutes auth={auth} />}>
              <Route path='/home' element={<Home name={name} rating={rating} setRating={setRating} setAuth={setAuth} setName={setName} />} />
              <Route path='/dailyrating' element={didDayRating ? <Navigate to="/home" /> : <Rating name={name} rating={rating} setRating={setRating} />} />
            </Route>
            <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Router>
    </DayRatingContext.Provider>
  );
}

export default App;
