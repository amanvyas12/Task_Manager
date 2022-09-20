import React from 'react'

const Admin = ({handleLogout}) => {
  return (
    <div>
        <nav className='hero'>
            <h2>Task Manager</h2>
            <h3>Admin panel</h3>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    </div>
  )
}

export default Admin