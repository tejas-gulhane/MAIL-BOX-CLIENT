import React from 'react'
import classes from './CreateEmail.module.css'
import { useRef ,useState } from 'react'
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { mailActions } from '../store/mailreducer';

const createmail = () => {
  
    const toEmailInp = useRef();
    const emailHeadingInp = useRef();
    const emailBodyInp = useRef();
    
    const userEmail = useSelector(state=>state.auth.email);
    const cleanUserEmail = useSelector(state=>state.auth.cleanemail);
  
    const dispatch = useDispatch();

    const sendMailHandler = () => {
        const emailData = {
            to: toEmailInp.current.value,
            heading: emailHeadingInp.current.value,
            body: emailBodyInp.current.value,
          };

        const sender= toEmailInp.current.value.replace(/[^a-zA-Z ]/g, "");

        fetch(`https://mailboxclient-b9ce0-default-rtdb.firebaseio.com/${cleanUserEmail}sentmails.json`,
        {
         method: "POST",
         headers: {
           "Content-type": "application-json",
         },
         body: JSON.stringify(emailData),
       })
         .then((res) => res.json())
         .then((data) => {
            dispatch(mailActions.saveEmailid(toEmailInp.current.value))
        
         });
       toEmailInp.current.value = "";
       emailHeadingInp.current.value = "";
       emailBodyInp.current.value = "";
   
       fetch(`https://mailboxclient-b9ce0-default-rtdb.firebaseio.com/${sender}inboxmails.json`,
        {
         method: "POST",
         headers: {
           "Content-type": "application-json",
         },
         body: JSON.stringify(emailData),
       })
   

    }
  return (
    <>
    <input className={classes.to} placeholder="To" type={"email"} ref={toEmailInp}></input>
    <input className={classes.mailHeading} placeholder="Email Heading" ref={emailHeadingInp}></input>
    <div
      className={classes.editorDiv}
      style={{ backgroundColor: "#fff", height: "25vw" }}
    >
              <Editor
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                />
              <textarea ref={emailBodyInp}></textarea>
            
    </div>
    <button className={classes.sendMailBtn} onClick={sendMailHandler}>Send Mail</button>
  </>
  )
}

export default createmail