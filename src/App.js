import React, { useState, useEffect } from 'react';
import Rating from './Pages/Rating/Rating'
import Home from './Pages/Home/Home'
import ErrorPage from './Pages/Error/ErrorPage'
import Login from './Pages/Login/Login'
import Logout from './Pages/Home/Logout';
import Profile from './Pages/Profile/Profile';
import Settings from './Pages/Settings/Settings';
import {BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import {db, auth as authenticated} from './firebase-config'
import { signOut } from 'firebase/auth'
import { collection, getDoc, doc } from 'firebase/firestore'
import { useLocalStorage } from './useLocalStorage';
import { ProtectedRoutes } from './ProtectedRoutes';
import { DayRatingContext } from './DayRatingContext';

function App() {
  const [value, onChange] = useState(new Date());
  const [rating, setRating] = useState(null); 
  const [auth, setAuth] = useLocalStorage('auth', false);
  const [name, setName] = useLocalStorage('name', '');
  const [didDayRating, setDidDayRating] = useLocalStorage('day-rate', false);

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');


  /**
   * ! ALL TO DO'S SO FAR
   * *all authentication todos here
   * TODO: fix authentication, create sessions that expire using the token that is created on login
   * TODO: fix mobile login with the redirect instead of popup
   * 
   * TODO: buy/create a logo - in progress
   * 
   * TODO: fix modals in dark mode
   * TODO: build profile page showing total ratings, streaks, other interesting info
   * ...
   * TODO: media queries, make sure it looks good on mobile and tablet
    */

  //MAKE A USE AUTH HOOK AND USE FIREBASE

  return (
    <div data-theme={theme} className='App'>
      <DayRatingContext.Provider value={setDidDayRating}>
        <Router>
          {auth && <nav className='navbar'>
            <NavLink className='logo' to='/'>logo</NavLink>
            <NavLink className='settings-nav' to='/settings'></NavLink>
            <NavLink className='profile-nav' to="/profile"></NavLink>
          </nav>}
          <Routes>
              <Route path='/' element={auth ? <Navigate to="/dailyrating" /> : <Navigate to='/login' />} />
              <Route path='/login' element={auth ? <Navigate to='/dailyrating' /> : <Login setAuth={setAuth} setName={setName} />} />
              <Route element={<ProtectedRoutes auth={auth} />}>
                <Route path='/home' element={<Home name={name} rating={rating} setRating={setRating} setAuth={setAuth} setName={setName} />} />
                <Route path='/dailyrating' element={didDayRating ? <Navigate to="/home" /> : <Rating name={name} rating={rating} setRating={setRating} />} />
                <Route path='/profile' element={<Profile setAuth={setAuth} setName={setName} name={name} />} />
                <Route path='/settings' element={<Settings setTheme={setTheme} theme={theme} />} />
              </Route>
              <Route path='*' element={<ErrorPage />} />
          </Routes>
        </Router>
        <div className='attribution'>Made by <a className='attribution-link' href="https://rafaelsinger.com" target="_blank">Rafael Singer</a></div>
      </DayRatingContext.Provider>
    </div>
  );
}

export default App;
