import React, { useState, useEffect } from 'react'
import Task from '../TaskTable/Task'
import fire from '../../../fire'
import styles from './user.module.css'

export const User = (props) => {

  const{handleLogout} = props
  const[userPanel, setUserPanel] = useState()
  
  // useEffect to get the current user logged in..
  useEffect(()=>{
    fire.auth().onAuthStateChanged(user => {
        if (user) {
          const loginUser = user._delegate.email
          const a = loginUser.split('@')[0]
          setUserPanel(a)
        }
      })
  },[])


  return (
    <div className='hero'>
        <nav>
            <h2>Task Manager</h2>
            <h3>Hello {userPanel}</h3>
            <button onClick={handleLogout} className={styles.logout}>Logout</button>
        </nav>
        <Task />
        {/* <Login></Login> */}
    </div>
  )
}

export default User
