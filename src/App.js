import React, { useState, useEffect } from 'react';
import Rating from './Pages/Rating/Rating'
import Home from './Pages/Home/Home'
import ErrorPage from './Pages/Error/ErrorPage'
import Login from './Pages/Login/Login'
import {BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import {db, auth as authenticated} from './firebase-config'
import { signOut } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore'
import { useLocalStorage } from './useLocalStorage';
import { ProtectedRoutes } from './ProtectedRoutes';

function App() {
  const [value, onChange] = useState(new Date());
  const [rating, setRating] = useState(null); //{text: '', color: null, date: null, note: ''}
  const [auth, setAuth] = useLocalStorage('auth', false);
  const [name, setName] = useLocalStorage('name', '');

  //MAKE A USE AUTH HOOK AND USE FIREBASE

  /** HANDLE SIGN OUT LOGIC, NEED TO ADDRESS REDIRECTION TO LOGIN PAGE */
  //********************************************************************* */
  //need to fix rerouting logic depending on if they submitted a rating or not, maybe doing it depending on status of submit button in RatingButton

  // <Route path='/' element={auth ? <Navigate to='/dailyrating' /> : <Navigate to='/login' />} />

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login setAuth={setAuth} setName={setName} />} />
        <Route element={<ProtectedRoutes auth={auth} />}>
          <Route path='/home' element={<Home name={name} rating={rating} setRating={setRating} setAuth={setAuth} setName={setName} />} />
          <Route path='/dailyrating' element={<Rating name={name} rating={rating} setRating={setRating} />} />
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;


/* 
to do list:
- fix authentication, try checking to see if authenticated using custom useAuth hook and by checking Firebase
- add a description on the home page to explain wtf the app is
- add logic to only allow people onto the dailyrating page if they have not already submitted a rating
- display all the ratings on the map
- ...
- add functionality to click on each calendar day and adjust its rating (prolly use a route with a param /:date or something idk)
- add styling to each day to show if there's a note (little triangle in the top left, manilla)

- build dark mode
- build profile page showing total ratings, streaks, other interesting info


*/