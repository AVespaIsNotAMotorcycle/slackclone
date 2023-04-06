import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import ServerContext from '../../utils/ServerContext';
import {
  Button,
  ContentBox,
  TextField,
} from '../Common';

function Profile() {
  const {
    user,
    getUserServers,
    setServerName,
    createServer,
  } = useContext(ServerContext);
  const [serverList, setServerList] = useState([]);
  const [newServer, setNewServer] = useState(false);
  const [newServerName, setNewServerName] = useState('');

  useEffect(() => {
    getUserServers(user)
      .then((servers) => { setServerList(servers); })
  }, []);

  if (newServer) {
    return (
      <div className="login-outer">
        <ContentBox>
          <TextField
            label="Server name:"
            id="new_server_name"
            onChange={(e) => { setNewServerName(e.target.value); }}
          />
          <Button variant="filled" onClick={() => { createServer(newServerName); }}>
            Create
          </Button>
          <Button onClick={() => { setNewServer(false); }}>
            Cancel
          </Button>
        </ContentBox>
      </div>
    );
  }
  return (
    <div className="login-outer">
    <ContentBox>
      <h2>
        {`Welcome ${user}`}
      </h2>
      {serverList.map((serverName) => (
        <Button
          variant="filled"
          key={serverName}
          onClick={() => { setServerName(serverName); }}
        >
          {serverName}
        </Button>
      ))}
      <Button onClick={() => { setNewServer(true); }}>
        Create Server
      </Button>
    </ContentBox>
    </div>
  );
}

export default Profile;
