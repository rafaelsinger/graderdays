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

  const defaultLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultLight ? 'light' : 'dark');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme])


  /**
   * ! ALL TO DO'S SO FAR
   * *all authentication todos here
   * TODO: fix mobile login with the redirect instead of popup
   * 
   * TODO: build profile page with interesting functionality - graphs? streaks?
   * TODO: potentially look into adding more settings? maybe a disclaimer lol
   * ...
   * !POTENTIAL IMPORTANT ERROR: localStorage vs. storing in database, make sure website works across browsers and devices (even when clearing cookies)
   * TODO: media queries, make sure it looks good on mobile and tablet, also make sure looks good on desktop
   * 
   * TODO BEFORE V1 LAUNCH:
   *  - go through each type of device and make sure it at least looks okay (media queries) 
    */

  //MAKE A USE AUTH HOOK AND USE FIREBASE

  return (
      <DayRatingContext.Provider value={setDidDayRating}>
        <Router>
          {auth && <nav className='navbar'>
            <NavLink className='logo' to='/'></NavLink>
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
  );
}

export default App;
