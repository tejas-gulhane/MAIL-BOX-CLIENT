import React from 'react'
import Signup from '../../components/authentication/Signup'
import Login from '../../components/authentication/Login'
import { authActions } from '../store/authreducer'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const signup = useSelector(state=>state.auth.signup)
  return (
    <>
        { !signup && <Signup /> }
        { signup && <Login /> }
    </>
  )
}

export default Navbar