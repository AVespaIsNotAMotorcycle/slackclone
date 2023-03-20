import { useEffect, useState } from 'react';
import axios from 'axios';

import ChatView from '../ChatView';
import Header from '../Header';
import Sidebar from '../Sidebar';

import './App.css';

const SERVER = {
  frontend: {
    users: ['localUser', 'userA', 'userB'],
    chat: [
      { user: 'userA', text: 'Test frontend message A' },
      { user: 'userB', text: 'Test frontend message B' },
    ],
  },
  backend: {
    user: ['localUser', 'userC'],
    chat: [
      { user: 'userC', text: 'Test backend message A' },
    ],
  },
};

function fetchServer() {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:5000/server/test_server')
      .then((resp) => { resolve(resp.data); })
      .catch((err) => { reject(err); });
  });
}

function App() {
  const [channel, setChannel] = useState('general');
  const [server, setServer] = useState({});
  const [user] = useState('localUser');
  const loaded = Object.keys(server).length > 0;
  const [chat, setChat] = useState([]);

  const updateServer = (newServer) => {
      setServer(newServer);
      setChat(newServer[channel].chat);
  };

  const sendMessage = (text, sender = user) => {
    const nChat = [...chat];
    nChat.push({ user: sender, text });
    setChat(nChat);
    axios.post(`http://localhost:5000/server/test_server/${channel}/${sender}.${text}`)
      .then((resp) => { updateServer(resp.data); });
  };

  useEffect(() => {
    fetchServer().then((newServer) => { updateServer(newServer); });
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="content">
        <Sidebar
          channels={Object.keys(server)}
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
