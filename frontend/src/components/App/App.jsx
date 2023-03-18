import { useEffect, useState } from 'react';

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

function mockResponse(channel, sendMessage) {
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };
  const willRespond = getRandomInt(2);
  if (!willRespond) { return; }
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque venenatis cursus nulla rhoncus dignissim. In facilisis, erat sit amet elementum tempus, velit tortor pellentesque odio, et accumsan mi nulla id massa. Sed iaculis neque odio. Duis luctus lectus vel ornare tempor. Nam in molestie lorem, sed placerat ipsum. Fusce condimentum ultrices feugiat. Fusce maximus dui ex, non tincidunt nunc convallis in.'.split(' ');
  const words = lorem.length;
  const sender = 'userC';
  sendMessage(lorem.slice(getRandomInt(words)).join(' '), sender);
};

function App() {
  const [channel, setChannel] = useState('frontend');
  const [chat, setChat] = useState(SERVER[channel].chat);
  const [user] = useState('localUser');

  const sendMessage = (text, sender = user) => {
    const nChat = [...chat];
    nChat.push({ user: sender, text });
    setChat(nChat);
    SERVER[channel].chat = nChat;
  };

  useEffect(() => {
    setChat(SERVER[channel].chat);
  }, [channel]);

  useEffect(() => {
    mockResponse(channel, sendMessage);
  }, [chat.length]);

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
