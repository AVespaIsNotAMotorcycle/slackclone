import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const BACKEND_HOSTNAME = 'http://localhost:5000';
const SERVER_NAME = 'test_server';
const MINIMUM_REFRESH_TIME = 1000;
const MAXIMUM_REFRESH_TIME = 600000;

const ServerContext = createContext();

export function ServerContextProvider({ children }) {
  const [server, setServer] = useState({});
  const [channels, setChannels] = useState([]);
  const [user, setUser] = useState('');
  const [refreshTimer, setRefreshTimer] = useState(MINIMUM_REFRESH_TIME);

  useEffect(() => {
    setTimeout(() => fetchServer('test_server'), refreshTimer);
  }, [server]);

  const signup = (username, password) => {
    return new Promise((resolve, reject) => {
      axios.post(`${BACKEND_HOSTNAME}/user/signup`,
      { params: { username, password } })
        .then(({ status }) => {
          if (status !== 200) reject(status);
          setUser(username); resolve(status);
        })
        .catch((error) => { reject(error); });
    });
  };

  const login = (username, password) => {
    return new Promise((resolve, reject) => {
      axios.get(`${BACKEND_HOSTNAME}/user/login`,
      { params: { username, password } })
        .then((response) => { setUser(username); resolve(response); })
        .catch((error) => { reject(error); })
    });
  };

  const updateServer = (newServer) => {
    if (JSON.stringify(newServer) !== JSON.stringify(server)) {
      setRefreshTimer(MINIMUM_REFRESH_TIME);
    } else if (refreshTimer < MAXIMUM_REFRESH_TIME) {
      setRefreshTimer(refreshTimer * 1.2);
    }
    setServer(newServer);
    setChannels(Object.keys(newServer));
  };

  const fetchServer = (serverName) => {
    if (!user) return Promise.reject('no user');
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:5000/server/${serverName}`,
      { params: { user } })
        .then((response) => { updateServer(response.data); })
        .catch((error) => { reject(error); })
    });
  }

  const sendMessage = (text, channel) => {
    axios.post(
      `${BACKEND_HOSTNAME}/server/${SERVER_NAME}/${channel}/`,
      { user, text },
    ).then((response) => { updateServer(response.data); })
     .catch((error) => { console.error(error); });
  };

  useEffect(() => { fetchServer(SERVER_NAME); }, [user]);

  const value = {
    channels,
    server,
    sendMessage,
    user,
    signup,
    login,
  };

  return (
    <ServerContext.Provider value={value}>
      {children}
    </ServerContext.Provider>
  );
}

export default ServerContext
