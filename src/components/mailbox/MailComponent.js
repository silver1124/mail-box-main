import React, { useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import classes from './MailComponent.module.css'; // Add your styling

const MailComponent = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [mailBody, setMailBody] = useState("");
  console.log(mailBody);

  useEffect(()=>{
    setMailBody(editorState.getCurrentContent().getPlainText());
}, [editorState]);

  const senderEmail= localStorage.getItem('email');

  const handleSend = async() => {

    const mailData = {
        email: to,
        subject: subject,
        message: mailBody,
      };

      try{
        const response = await fetch(
            `https://mail-box-d8f7b-default-rtdb.firebaseio.com//${senderEmail}SentMail.json`,
            {
              method: "POST",
              body: JSON.stringify(mailData),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          let data = await response;
          console.log(data);

      }catch(err){
        console.log(err);
      }
     setTo("");
     setSubject("");
     setMailBody("");
  };

  return (
    <>
    <h2 className={classes.mailHeading}>Compose Email</h2>
    <div className={classes.mail_container}>
    <div className={classes.toMail}>
    <input
    type="email"
    placeholder="To"
    value={to}
    onChange={(e) => setTo(e.target.value)}
  />
    </div>
    <div className={classes.subject}>
    <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
    </div> 

      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
              placeholder="Write your message here..."         
      />
      <button className={classes.send_button} onClick={handleSend}>
        Send
      </button>
    </div>
    </>
  );
};

export default MailComponent;