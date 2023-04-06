import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css';

import ServerContext from '../../utils/ServerContext';
import { Button, TextField } from '../Common';

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

function UserList() {
  const { server, addUserToServer } = useContext(ServerContext);
  const users = server.users ? server.users : [];
  const [invitee, setInvitee] = useState('');
  return (
    <div className="subsection">
      Users
      {users.map((user) => (
        <Button key={user}>
          {user}
        </Button>
      ))}
      <TextField
        label="Add person by username:"
        id="add_user_to_server"
        onChange={(e) => { setInvitee(e.target.value); }}
      />
      <Button onClick={() => { addUserToServer(invitee); }}>
        Add User
      </Button>
    </div>
  );
}

function Sidebar({ setChannel }) {
  return (
    <div className="sidebar">
      <ServerName />
      <ChatOptions />
      <ChatList
        setChannel={setChannel}
      />
      <UserList />
    </div>
  );
}

export default Sidebar;

Sidebar.propTypes = {
  setChannel: PropTypes.func.isRequired,
};
