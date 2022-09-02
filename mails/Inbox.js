import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { mailSliceActions } from '../store/mailReducer';

const Inbox = () => {
    const allMails = useSelector(state =>state.mail.sentmails)
    const dispatch=useDispatch()
    console.log(allMails);

    useEffect(() => {
        fetch(
          `https://mailboxclient-b9ce0-default-rtdb.firebaseio.com/emails.json`,
          {
            method: "GET",
            headers: {
              "Content-type": "application-json",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            dispatch(mailSliceActions.saveSentMails(data));
          });
      }, []);
   

  return (
    <>
        <div>
   
        <ul>
         
          {
            allMails &&  Object.keys(allMails).map((item) => (
            <li key={item} id={item}>
              {`body: ${allMails[item].body}\t heading: ${allMails[item].heading}\to: ${allMails[item].to}`}
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