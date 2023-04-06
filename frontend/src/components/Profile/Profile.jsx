import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import ServerContext from '../../utils/ServerContext';
import {
  Button,
  ContentBox,
} from '../Common';

function Profile() {
  const { user, getUserServers, setServerName } = useContext(ServerContext);
  const [serverList, setServerList] = useState([]);

  useEffect(() => {
    getUserServers(user)
      .then((servers) => { setServerList(servers); })
  }, []);

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
      <Button>
        Create Server
      </Button>
    </ContentBox>
    </div>
  );
}

export default Profile;
