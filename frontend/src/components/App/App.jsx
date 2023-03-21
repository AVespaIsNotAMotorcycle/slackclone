import { useContext, useState } from 'react';

import ServerContext, { ServerContextProvider } from '../../utils/ServerContext';

import ChatView from '../ChatView';
import Header from '../Header';
import Sidebar from '../Sidebar';
import LogIn from '../LogIn';

import './App.css';

function Content() {
  const [channel, setChannel] = useState('general');
  const { user } = useContext(ServerContext);
  if (!user) return <LogIn />;
  return (
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
  );
}

function App() {
  return (
    <ServerContextProvider>
      <Content />
    </ServerContextProvider>
  );
}

export default App;
