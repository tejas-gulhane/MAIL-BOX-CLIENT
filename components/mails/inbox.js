import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { mailActions } from '../store/mailreducer';
import InboxMessages from './InboxMessages';

const Inbox = () => {
    const allMails = useSelector(state =>state.mail.sentmail)

    const reciver = useSelector(state =>state.auth.useremail)
    const cleanToEmail = reciver.replace(/[^a-zA-Z ]/g, "");

    const dispatch=useDispatch()
  
    useEffect(() => {
      
        fetch( `https://mailboxclient-b9ce0-default-rtdb.firebaseio.com/${cleanToEmail}inboxmails.json`,
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
          });
      }, []);
   

  return (
    <>
        <div>
   
        <ul>
         
          {
            allMails &&  Object.keys(allMails).map((item) => (
            <li key={item} id={item}>
              {<InboxMessages 
              id={item}
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

export default Inbox