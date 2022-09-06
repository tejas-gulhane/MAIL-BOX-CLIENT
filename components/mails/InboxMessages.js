import React from 'react'
import { useEffect ,useState } from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { mailActions } from '../store/mailreducer';

const InboxMessages = (props) => {

  // const [del , setdel] = useState(false)
  const id=props.id;

  const cleanUserEmail= useSelector(state => state.auth.cleanemail)
 
  const dispatch = useDispatch()
  useEffect(()=>{

  },[dispatch])

  const delinboxmail = () => {
       fetch(
      `https://mailboxclient-b9ce0-default-rtdb.firebaseio.com/${cleanUserEmail}inboxmails/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        fetch(
          `https://mailboxclient-b9ce0-default-rtdb.firebaseio.com/${cleanUserEmail}inboxmails.json`
        )
          .then((res) => res.json())
          .then((data) => {
              dispatch(mailActions.setSentMail(data))
          });
      }
    });
  }

  return (
    <>
    <button onClick={delinboxmail}>Delete</button>
    <h4>{props.body}</h4>
    </>
  )
}

export default InboxMessages