import { useState } from 'react';

import ChatView from '../ChatView';
import Header from '../Header';
import Sidebar from '../Sidebar';

import './App.css';

const SERVER = {
  frontend: {
    users: [],
    chat: [
      { text: 'Test Message A' },
      { text: 'Test Message B' },
    ],
  }
};

function App() {
  const [channel] = useState('frontend');
  const [chat, setChat] = useState(SERVER[channel].chat);

  const sendMessage = (text) => {
    const nChat = [...chat];
    nChat.push({ text });
    setChat(nChat);
  };

  return (
    <div className="app">
      <Header />
      <div className="content">
        <Sidebar />
        <ChatView
          chat={chat}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default App;
