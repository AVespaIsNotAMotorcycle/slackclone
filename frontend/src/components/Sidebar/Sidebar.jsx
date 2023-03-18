import React from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css';

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

function ChatList({ channels, setChannel }) {
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
  channels: PropTypes.instanceOf(Array).isRequired,
  setChannel: PropTypes.func.isRequired,
};

function Sidebar({ channels, setChannel }) {
  return (
    <div className="sidebar">
      <ServerName />
      <ChatOptions />
      <ChatList
        channels={channels}
        setChannel={setChannel}
      />
    </div>
  );
}

export default Sidebar;

Sidebar.propTypes = {
  channels: PropTypes.instanceOf(Array).isRequired,
  setChannel: PropTypes.func.isRequired,
};
