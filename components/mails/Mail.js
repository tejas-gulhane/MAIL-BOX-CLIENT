import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authreducer';
import { useSelector } from 'react-redux/es/exports';
import Createmail from './createmail';
import Inbox from './inbox';
import Outbox from './outbox';
import classes from "./mail.module.css";


const Mail = () => {
  const [createMailOpen, setCreateMailOpen] = useState(true);
  const [inboxOpen, setInboxOpen] = useState(false);
  const [outboxOpen, setOutboxOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch=useDispatch();

  const userEmail = useSelector(state => state.auth.useremail);

  const createmailhandler = () => {
    setInboxOpen(false);
    setOutboxOpen(false);
    setCreateMailOpen(true);
    navigate('/createmail');
  };
  const inboxhandler = () => {
    setOutboxOpen(false);
    setCreateMailOpen(false);
    setInboxOpen(true);
    navigate('/inbox');
  };

  const outboxhandler = () => {
    setCreateMailOpen(false);
    setInboxOpen(false);
    setOutboxOpen(true);
    navigate('/outbox');
  };

  const logoutClickHandler = () => {
    dispatch(authActions.logout());
    navigate('/login');
  };

  return (
    <><div>
    <div>
      <h1>Welcome To your Mail Box</h1>
      <span>{userEmail}</span>
      <button onClick={logoutClickHandler}>Log Out</button>
    </div>
    <br/>
    <div>
      <div className={classes.sideNav}>
        <button onClick={createmailhandler}>Create Email</button>
        <br />
        <button onClick={inboxhandler}>In Box</button>
        {/* {unreadMessages ? <span>Unread: {unreadMessages}</span> : ''} */}
        <br />
        <button onClick={outboxhandler}>Out Box</button>
      </div>
      <div className={classes.mailBox}>
        {createMailOpen && <Createmail />}
        {/* {inboxOpen && <Inbox setUnread={setUnreadHandler}/>} */}
        {inboxOpen && <Inbox />} 
        {outboxOpen && <Outbox />}
      </div>
    </div>
  </div>
    </>
  )
}

export default Mail