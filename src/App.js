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

function App() {
  const [value, onChange] = useState(new Date());
  const [rating, setRating] = useState(null); //{text: '', color: null, date: null, note: ''}
  const [auth, setAuth] = useLocalStorage('auth', false);

  console.log(auth);

  const name = authenticated.currentUser?.displayName.split(' ')[0];

  //const q = query(collection(db, "users"), where("uid", "==", user?.uid));
  // const doc = await getDocs(q);
  // const data = doc.docs[0].data();

  /** HANDLE SIGN OUT LOGIC, NEED TO ADDRESS REDIRECTION TO LOGIN PAGE */
  //********************************************************************* */
  //need to fix rerouting logic depending on if they submitted a rating or not, maybe doing it depending on status of submit button in RatingButton

  return (
    <Router>
      <Routes>
        <Route path='/' element={auth ? <Navigate to='/dailyrating' /> : <Navigate to='/login' />} />
        <Route path='/login' element={<Login setAuth={setAuth} />} />
        <Route path='/home' element={<Home name={name} rating={rating} setAuth={setAuth} />} />
        <Route path='/dailyrating' element={<Rating name={name} rating={rating} setRating={setRating} />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
