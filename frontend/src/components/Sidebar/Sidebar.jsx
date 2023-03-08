import React from 'react';
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

function ChatList() {
  return (
    <div className="subsection">
      Channels
      <ul>
        <li># frontend</li>
        <li># backend</li>
        <li># bugs</li>
        <li># general</li>
      </ul>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="sidebar">
      <ServerName />
      <ChatOptions />
      <ChatList />
    </div>
  );
}

export default Sidebar;
