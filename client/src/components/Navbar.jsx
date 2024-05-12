import React from 'react'
import {IconButton} from "@mui/material"
import {Search, Person, Menu} from "@mui/icons-material"
import variables from "../styles/variables.scss"
import "../styles/Navbar.scss"
import {useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import { setLogout } from '../redux/state'

const Navbar = () => {
    const [dropdownMenu, setDropdownMenu] = useState(false);
    const user = useSelector((state)=>state.user);
    const dispatch = useDispatch();
  return (
    <div className='navbar'>
         <a href="/">
            <img src="assets/logo.jpg" alt="logo" />
         </a>

         <div className="navbar_search">
            <input type="text" placeholder='search...' />
            <IconButton>
                <Search sx={{color: variables.green}}/>
            </IconButton>
         </div>

         <div className="navbar_right">
            {user ? (<a href='/create-listing' className='host'>Become A Host</a>) : (<a href='/login' className='host'>Become A Host</a>)}
            <button className='navbar_right_account' onClick={()=>{setDropdownMenu(!dropdownMenu)}}>
                  <Menu sx={{color: variables.darkgrey}}/>
                  { !user ? 
                  <Person sx={{color: variables.darkgrey}}/>
                  : 
                  (
                    <img src={`http://localhost:3001/${user.profileImagePath.replace("public", "")}`} alt="profile photo" style={{objectFit:"cover", borderRadius: "50%", }}/>
                  )
                  }                   
            </button>

            {
                dropdownMenu && !user && (<div className = "navbar_right_accountmenu">
                      <Link to="/login">Log In</Link>
                      <Link to="/register">Sign Up</Link>
                </div>)
            }

            {
                dropdownMenu && user && (<div className = "navbar_right_accountmenu">
                    <Link to="">Trip List</Link>
                    <Link to="">Wish List</Link>
                    <Link to="">Property List</Link>
                    <Link to="">Reservation List</Link>
                    <Link to="">Become A Host</Link>

                    <Link to="/login" onClick={()=>{dispatch(setLogout)}}>Log Out</Link>
                </div>)
            }
         </div>
    </div>
  )
}

export default Navbar