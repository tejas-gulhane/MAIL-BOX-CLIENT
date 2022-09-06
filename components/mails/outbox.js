import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { mailActions } from '../store/mailreducer';
import OutboxMessage from './OutboxMessage';

const Outbox = () => {
    const allMails = useSelector(state =>state.mail.sentmail)
    const dispatch=useDispatch()
    
    const sender = useSelector(state => state.auth.cleanemail)

    useEffect(() => {
        fetch(
          `https://mailboxclient-b9ce0-default-rtdb.firebaseio.com/${sender}sentmails.json`,
          {
            method: "GET",
            headers: {
              "Content-type": "application-json",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            dispatch(mailActions.setSentMail(data));
            console.log(data);
          });
      }, []);
   

  return (
    <>
        <div>
   
        <ul>
         
          {
            allMails &&  Object.keys(allMails).map((item) => (
            <li key={item} id={item}>
              {<OutboxMessage 
              body={allMails[item].body}
              heading={allMails[item].heading}
              to={allMails[item].to} /> }
              
            </li>
          ))
          }
        </ul>
      </div>
    <div>

   
    </div>
    
    </>
  )
}

export default Outbox;