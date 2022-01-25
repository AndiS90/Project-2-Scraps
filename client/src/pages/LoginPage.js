import React from 'react';
import { Link } from 'react-router-dom';
import "../../css/stylesheet.css"

// import Auth from '../utils/auth';

// import Title from "../components/Title/title"

const LoginPage = () => {
    return (
        <div className="loginPage"> 
        <h1> HEEE</h1>
                <Link className="btn btn-lg btn-primary m-2" to="/login">
                <h2 className='title is-3 has-text-white'>  Login </h2>
              </Link>

              <Link className="btn btn-lg btn-light m-2" to="/signup">
               <h2 className='title is-3'> Signup </h2> 
              </Link>
        </div>

    )
}
export default LoginPage;