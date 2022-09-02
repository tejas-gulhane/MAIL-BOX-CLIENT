import React ,{useState ,useRef} from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import classes from "./Mail.module.css";
import { useSelector ,useDispatch} from 'react-redux';
import { mailSliceActions } from '../store/mailReducer';
import Inbox from './Inbox';
import Outbox from './Outbox'



const Mail = () => { 

  const [createMailOpen, setCreateMailOpen] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(true);
  const [outboxOpen, setOutboxOpen] = useState(false);

  const toEmailInp = useRef();
  const emailHeadingInp = useRef();
  const emailBodyInp = useRef();

  const dispatch=useDispatch()
  const mailId = useSelector( state => state.mail.mailId)
  const sentMails = useSelector( state => state.mail.sentmails)


  const sendMailClickHandler = () => {
    const emailData = {
      to: toEmailInp.current.value,
      heading: emailHeadingInp.current.value,
      body: emailBodyInp.current.value,
    };

    fetch("https://mailboxclient-b9ce0-default-rtdb.firebaseio.com/emails.json", {
      method: "POST",
      headers: {
        "Content-type": "application-json",
      },
      body: JSON.stringify(emailData),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(mailSliceActions.saveEmailid(toEmailInp.current.value))
        dispatch(mailSliceActions.saveSentMails(emailBodyInp.current.value))
      });

    // console.log(emailData);
    toEmailInp.current.value = "";
    emailHeadingInp.current.value = "";
    emailBodyInp.current.value = "";
  };

  const createMailClickHandler = () => {
    setInboxOpen(false);
    setOutboxOpen(false);
    setCreateMailOpen(true);
  };
  const inboxClickHandler = () => {
    setOutboxOpen(false);
    setCreateMailOpen(false);
    setInboxOpen(true);
  };


  const outboxClickHandler = () => {
    setCreateMailOpen(false);
    setInboxOpen(false);
    setOutboxOpen(true);

  };

  return (
    <>
      <h1>Welcome To your Mail Box</h1>
      <div className={classes.sideNav}>
        <button onClick={createMailClickHandler}>Create Email</button>
        <br />
        <button onClick={inboxClickHandler}>In Box</button>
        <br />
        <button onClick={outboxClickHandler}>Out Box</button>
      </div>

      <div className={classes.mailBox}>
        {createMailOpen && 
          <>
            <label>To: </label>
            <input ref={toEmailInp}></input>
            <br />
            <label>Heading: </label>
            <input ref={emailHeadingInp}></input>
            <div style={{ backgroundColor: "#fff", height: "25vw" }}>
              <Editor
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                />
              <textarea ref={emailBodyInp}></textarea>
            </div>
            <button onClick={sendMailClickHandler}>Send Mail</button>
          </>
        }
        {inboxOpen && <Inbox/>}
        {outboxOpen && <Outbox />}
      </div>
    </>
  );
};

export default Mail;