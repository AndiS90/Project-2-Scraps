import React from 'react';
import { Link } from 'react-router-dom';
import "../../css/stylesheet.css";
// import Title from "../Title/title"
import logo from "../../images/logo-noobs.png"
// import LoginTitle from "../titleLogin/titleLogin"

import Auth from '../../utils/auth';
// import LoginBtn from '../loginBtn';



const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (

    <header class="header" className="header-div"> 
    {/* <LoginTitle/> */}
         {/* <div className="container flex-column justify-space-between-lg text-center">

       */}
       
          {Auth.loggedIn() ? (
            <>

            {/* =============== IF LOGGED IN ================= */}
                      {/* NAVBAR WILL BE DISPLAYED  */}
{/* 
<Title/> */}

<div className='logo-div'>
    <img src = {logo} alt = "" className = "icon"></img>
</div>


 <div className="navbar">
   
    <nav class= "nav" className="nav">
                
        <ul>
          {/* LOGOUT LINK  */}
          <li> <Link className="" onClick={logout}>
               <h2 className='has-text-white'> Logout </h2> 
                </Link>           
         </li>

         <li> <Link className="" to="/">
            <h2 className='has-text-white'> Home </h2> 
              </Link>
          </li>

          {/* LINK TO DISPLAY DASHBOARD */}
          <li> <Link className="" to="/me">
            <h2 className='has-text-white'> Dashboard </h2> 
              </Link>
          </li>

            {/* LINK TO MESSAGES (NOT MADE YET)
          <li> <a href="#messager"> 
            <h2 className='title is-4 has-text-white'> My Messages </h2> </a>
          </li>*/}

           </ul> 
        </nav>
   </div>

            </>
          ) : (
            <>


             {/* =============== IF LOGGED OUT ================= */}
             

          <div className='logo-div-two'>
              <img src = {logo} alt = "" class="icon-two"></img>
          </div>
            {/* <LoginBtn/> */}
       
              <nav class = "loggedOutNav nav-wrapper">

              <Link className="btn btn-large btn-primary m-2" to="/login">
                <h2 className=' has-text-white'>  Login </h2>
              </Link>

              <Link className="btn btn-large btn-light m-2" to="/signup">
               <h2 className=''> Signup </h2> 
              </Link>

              </nav>
            </>
          )}


       
    
    </header>
  );
};

export default Header;
