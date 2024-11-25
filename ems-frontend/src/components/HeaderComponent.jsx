import React from 'react'
import { NavLink } from 'react-router-dom'

export const HeaderComponent = () => {
  return (
    <div >
        <nav className='navbar navbar-expand-lg  navbar-dark bg-dark ' >
            <a className="  navbar-brand  " href="" >Employee Management System</a>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item  ">
                <NavLink className='nav-link' to='/employee'>Employees </NavLink>
              </li>

              <li className="nav-item  ">
                <NavLink className='nav-link' to='/departments'>Departments </NavLink> 
              </li>
            </ul>
          </div>
        </nav>
    </div>
  )
}
