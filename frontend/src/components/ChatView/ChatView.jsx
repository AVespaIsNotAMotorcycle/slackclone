import React, { useEffect, useState } from 'react';
import './ChatView.css';

import TextInput from './TextInput';
import TextMessage from './TextMessage';

function generateMessages(chat) {
  return chat.map((text) => <TextMessage text={text} />);
}

function ChatView() {
  const [chat, setChat] = useState([]);
  const [messages, setMessages] = useState(generateMessages(chat));

  const sendMessage = (text) => {
    const nChat = [...chat];
    nChat.push(text);
    setChat(nChat);
  }

  useEffect(() => {
    setMessages(generateMessages(chat));
  }, [chat.length]);

  return (
    <div className="chatview">
      <div className="inputview">
        <TextInput onSubmit={sendMessage} />
      </div>
      <div className="messagesview">
        {messages}
      </div>
    </div>
  );
}

export default ChatView;
