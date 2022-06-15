import React, {useEffect} from 'react'
import Logout from '../Home/Logout'

export default function Profile({setAuth, setName, name}) {
    useEffect(() => {
        document.title = 'Profile | Grader Days'
    }, [])
  return (
    <div className='profile-container'>
        <div className='profile-info'>
            <h1>{name}</h1>
            <Logout setAuth={setAuth} setName={setName} />
        </div>
    </div>
  )
}
