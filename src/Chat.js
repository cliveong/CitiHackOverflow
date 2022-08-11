import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore/lite";
import { Button } from "reactstrap";
import "./Chat.css";

const firebaseConfig = {
  apiKey: "AIzaSyASE4tbgNuLvk6iVTqKYIY2fV1vJpUeF0g",
  authDomain: "citi-72778.firebaseapp.com",
  projectId: "citi-72778",
  storageBucket: "citi-72778.appspot.com",
  messagingSenderId: "423009188841",
  appId: "1:423009188841:web:0e9436a170d8403623e978",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const fakeName = "Ivan";

export default function Chat() {
  function ChatRoom() {
    // const dummy = React.useRef()

    const [messages, setMessages] = React.useState("");
    const [docRef, setDocRef] = React.useState("");
    const messagesRef = collection(db, "messages");
    async function fetchData() {
      console.log("fetching");
      const query = await getDocs(messagesRef);
      const l = query.docs;
      if (l.length > 0) {
        l.sort((a, b) => (a.data(0).createdAt > b.data(0).createdAt ? 1 : -1));
      }
      // l = query.docs.sort((a, b) => (a.data().createdAt > b.data().createdAt) ? 1 : -1)
      setMessages(l.map((doc) => doc.data()));
    }
    React.useEffect(() => {
      fetchData();
    }, [docRef]);
    const [formValue, setFormValue] = React.useState("");

    const sendMessage = async (e) => {
      e.preventDefault();

      setDocRef(
        await addDoc(messagesRef, {
          text: formValue,
          createdAt: Date(),
          user: fakeName,
        })
      );

      setFormValue("");
      // dummy.current.scrollIntoView({behavior: 'smooth'})
    };
    return (
      <div className="chat-window">
        <div className="chat-messages">
          {messages && messages.map((msg) => <ChatMessage key={msg.user} message={msg} />)}
        </div>
        <hr style={{ margin: 0 }} />
        <div className="chat-form-wrapper">
          <form onSubmit={sendMessage} className="chat-form">
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
            <button type="submit">Sent</button>
          </form>
        </div>
      </div>
    );
  }

  function ChatMessage(props) {
    const { text, user, photoURL } = props.message;

    const messageClass = user === fakeName ? "sent" : "received";
    console.log(user);
    return (
      <div className={`message ${messageClass}`}>
        <p className="message-bubble">{text}</p>
        <p>{user ? user : "na"}</p>
      </div>
    );
  }
  const [toggled, setToggled] = useState(false);
  function handleToggle() {
    setToggled(!toggled);
  }
  return (
    <div className="chat-wrapper">
      {toggled && <ChatRoom />}
      <Button onClick={handleToggle} className="chat-button">
        {toggled ? "Close" : "Chat with Ivan"}
      </Button>
    </div>
  );
}
