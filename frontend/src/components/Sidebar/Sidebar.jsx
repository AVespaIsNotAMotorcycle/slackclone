import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css';

import ServerContext from '../../utils/ServerContext';

function ServerName() {
  return (
    <div className="subsection">
      <h1>my server</h1>
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
      <ul>
        {channels.map((channel) => (
          <li>
            <button type="button" onClick={() => { setChannel(channel); }}>
              {channel}
            </button>
          </li>
        ))}
      </ul>
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
