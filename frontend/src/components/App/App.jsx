import { useEffect, useState } from 'react';

import ChatView from '../ChatView';
import Header from '../Header';
import Sidebar from '../Sidebar';

import './App.css';

const SERVER = {
  frontend: {
    users: [],
    chat: [
      { user: 'userA', text: 'Test frontend message A' },
      { user: 'userB', text: 'Test frontend message B' },
    ],
  },
  backend: {
    user: [],
    chat: [
      { user: 'userC', text: 'Test backend message A' },
    ],
  },
};

function App() {
  const [channel, setChannel] = useState('frontend');
  const [chat, setChat] = useState(SERVER[channel].chat);
  const [user] = useState('localUser');

  const sendMessage = (text) => {
    const nChat = [...chat];
    nChat.push({ user, text });
    setChat(nChat);
    SERVER[channel].chat = nChat;
  };

  useEffect(() => { setChat(SERVER[channel].chat); }, [channel]);

  return (
    <div className="app">
      <Header />
      <div className="content">
        <Sidebar
          channels={Object.keys(SERVER)}
          setChannel={setChannel}
        />
        <ChatView
          chat={chat}
          sendMessage={sendMessage}
          user={user}
        />
      </div>
    </div>
  );
}

export default App;
