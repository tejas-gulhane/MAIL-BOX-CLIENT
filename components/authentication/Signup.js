import React from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authreducer';
import { useNavigate  } from "react-router-dom";
import Login from './Login';
import { useSelector } from 'react-redux';
import './auth.css'


const Signup = () => {
  const dispatch=useDispatch()
  
  const navigate=useNavigate()

  const signuphandler =(e) => {
      e.preventDefault();

      const email = e.target.elements["logInEmail"].value;
      const password = e.target.elements["password"].value;

      fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
        AIzaSyDJzFGMehDL_Sv8YBjxCcs1Ox2VjgMBPG4`, {
                method: 'POST',
                body: JSON.stringify({
                  email: email,
                  password: password,
                  returnSecureToken: true,
                }),
                headers: {
                  'Content-Type': 'application/json'
                }
      })
      .then(res=>{
        if (res.ok) {
          alert("SignUp sucessfully")
          navigate('/login') ;
        } else {
          return res.json().then(data => {
            const generalError = 'Authentication failed';
            const errmsg = data.error.message;
            console.log(data);
            if (errmsg) alert(data.error.message)
            else alert(generalError);
          })
        }
      }) 
  }
  const gotologinpage = () => { 
    navigate('/login') ;
    dispatch(authActions.signup())
  }

  return (
    <>
      <div className="login-container">
        <form action="" className="form-login" onSubmit={signuphandler}>
          <ul className="login-nav">
            <li className="login-nav__item active">
              <a href="#">Sign Up</a>
            </li>
          </ul>
          <label className="login__label">
            Username
          </label>
          <input id="logInEmail" className="login__input" type="text" />
          <label  className="login__label">
            Password
          </label>
          <input id="password" className="login__input" type="password" />
          <button className="login__submit" >Sign up</button>
        </form>
        <a href="#" className="login__forgot" onClick={gotologinpage}>Already Account?</a>
      </div>
    </>
  )
}

export default Signup