import logo from './logo.svg';
import './App.css';
import {Routes,Route} from  'react-router-dom'
import Signup from './components/Authentication/Signup'
import Login from './components/Authentication/Login'
import ForgotPassword from './components/Authentication/ForgotPassword';
import Homepage from './components/Homepage'
import Mails from './components/mails/Mail';

function App() {
  return (
   <>
      <h1>Mail-Box-Client</h1>
      <Homepage />
      <Routes>
        <Route exact path='/signup' element={<Signup />}/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/forgotpassword' element={<ForgotPassword />}/>
        <Route exact path='/mails' element={<Mails />}/>
      </Routes>
   </>
  );
}

export default App;
