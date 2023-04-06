import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css';

import ServerContext from '../../utils/ServerContext';
import { Button } from '../Common';

function ServerName() {
  const { serverName } = useContext(ServerContext);
  return (
    <div className="subsection">
      <h1>{serverName}</h1>
    </div>
  );
}

function ChatOptions() {
  return (
    <div className="subsection">
      <ul>
        <li>Threads</li>
        <li>Direct messages</li>
      </ul>
    </div>
  );
}

function ChatList({ setChannel }) {
  const { channels } = useContext(ServerContext);
  return (
    <div className="subsection">
      Channels
      {channels.map((channel) => (
        <Button key={channel} onClick={() => { setChannel(channel); }}>
          {channel}
        </Button>
      ))}
    </div>
  );
}

ChatList.propTypes = {
  setChannel: PropTypes.func.isRequired,
};

function Sidebar({ setChannel }) {
  return (
    <div className="sidebar">
      <ServerName />
      <ChatOptions />
      <ChatList
        setChannel={setChannel}
      />
    </div>
  );
}

export default Sidebar;

Sidebar.propTypes = {
  setChannel: PropTypes.func.isRequired,
};
