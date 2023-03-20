import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const BACKEND_HOSTNAME = 'http://localhost:5000';
const SERVER_NAME = 'test_server';

const ServerContext = createContext();

export function ServerContextProvider({ children }) {
  const [server, setServer] = useState({});
  const [channels, setChannels] = useState([]);
  const [user] = useState('localUser');

  const updateServer = (newServer) => {
    setServer(newServer);
    setChannels(Object.keys(newServer));
  };

  const fetchServer = (serverName) => {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:5000/server/${serverName}`)
        .then((response) => { updateServer(response.data); })
        .catch((error) => { reject(error); })
    });
  }

  const sendMessage = (text, channel) => {
    axios.post(
      `${BACKEND_HOSTNAME}/server/${SERVER_NAME}/${channel}/${user}.${text}`
    ).then((response) => { updateServer(response.data); })
     .catch((error) => { console.error(error); });
  };

  useEffect(() => { fetchServer(SERVER_NAME); }, []);

  const value = {
    channels,
    server,
    sendMessage,
    user,
  };

  return (
    <ServerContext.Provider value={value}>
      {children}
    </ServerContext.Provider>
  );
}

export default ServerContext
