import { useState } from 'react';

import { ServerContextProvider } from '../../utils/ServerContext';

import ChatView from '../ChatView';
import Header from '../Header';
import Sidebar from '../Sidebar';

import './App.css';

function App() {
  const [channel, setChannel] = useState('general');

  return (
    <ServerContextProvider>
      <div className="app">
        <Header />
        <div className="content">
          <Sidebar
            channel={channel}
            setChannel={setChannel}
          />
          <ChatView channel={channel} />
        </div>
      </div>
    </ServerContextProvider>
  );
}

export default App;
