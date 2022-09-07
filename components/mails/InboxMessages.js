import React from 'react'
import { useEffect ,useState } from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { mailActions } from '../store/mailreducer';
import './inboxmessage.css'

const InboxMessages = (props) => {
  const id=props.id;

  const cleanUserEmail= useSelector(state => state.auth.cleanemail)
  const usermail = useSelector(state=>state.auth.usermail)
  const [showemail ,setshowemail] = useState(false)

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

  const openmessagehandler = () =>{
    setshowemail(true)
  }
  const closemessagehandler = () =>{
    setshowemail(false)
  }
  

  return (
    <>

    { !showemail && <div className='row'>
      <button onClick={delinboxmail}>Delete</button>
      <h4 onClick={openmessagehandler}>{props.body}</h4>
    </div>}

{ showemail && 
<div className='message'>
    <button onClick={closemessagehandler}>X</button>
    <div>
      <h6>Heading :</h6><h1>{props.heading}</h1>
    </div>
    <div>
      <h6>Body :</h6><h1>{props.body}</h1>
    </div>

</div>}
    </>
  )
}

export default InboxMessages