import React ,{ useState }from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { authActions } from '../store/authreducer'
import './auth.css'

const Login = () => {
  const dispatch=useDispatch()

  const navigate=useNavigate()

  const [forgotpassword ,setforgotpassword] = useState(false)
  
  const loginhandler = async (e) =>{
    e.preventDefault();
    
    const email = e.target.elements["logInEmail"].value;
    const password = e.target.elements["password"].value;

    const data = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
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
              if (res.ok){
                res.json().then((data)=> {
                alert("LogIn sucessfully")
                navigate("/mails");
                dispatch(authActions.setuseremail(email));
                dispatch(authActions.setcleanemail(email.replace(/[^a-zA-Z ]/g, "")));
                dispatch(authActions.login(data.idToken));
                })
              } else {
                return res.json().then(data => {
                  const generalError = 'Login failed';
                  const errmsg = data.error.message;
                  console.log(data);
                  if (errmsg) alert(data.error.message)
                  else alert(generalError);
                })
              }
            })
            
          }
    const forgotpasswordhandler = () => {
      setforgotpassword(true);
      navigate('/forgot');
    }

  return (
    <>
          <div className="login-container">
          <form action="" className="form-login" onSubmit={loginhandler}>
            <ul className="login-nav">
              <li className="login-nav__item active">
                <a href="#">Sign In</a>
              </li>
            </ul>
            <label  className="login__label" >
              Username
            </label>
            <input className="login__input" type="text" id="logInEmail"/>
            <label  className="login__label">
              Password
            </label>
            <input  className="login__input" type="password" id="password"/>
            <button className="login__submit">Sign in</button>
          </form>
          <a href="#" className="login__forgot" onClick={forgotpasswordhandler}>Forgot Password?</a>
        </div>
    </>
  )
}

export default Login;