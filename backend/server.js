const generateResponse = require('./responseGenerator');

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

const SERVERS = {
  test_server: {
    users: ['sam', 'lorem', 'sam2'],
    channels: {
      general: {
        users: ['sam', 'lorem'],
        chat: [
          { user: 'lorem', text: 'Welcome to the server!' },
        ],
      },
    },
  },
};
const USERS = {
  sam: 'testpassword',
  sam2: 'testpassword2',
};

app.post('/server/:servername/:channel/', (request, response) => {
  const {
    servername,
    channel: channelName,
  } = request.params;
  const { user, text } = request.body;
  const server = SERVERS[servername];
  const channel = server.channels[channelName];
  channel.chat.push({ user, text });
  response.send(SERVERS[servername])
});

app.get('/server/:servername', (request, response) => {
  const { servername } = request.params;
  const { user } = request.query;
  const server = SERVERS[servername];
  if (server.users.includes(user)) {
    response.send(SERVERS[servername]); 
  } else {
    response.send(401);
  }
});

app.post('/server/add_user', (request, response) => {
  console.log('add_user');
  const { servername, user } = request.body.params;
  console.log(servername, user);
  if (!user) throw new Error('user is falsy');
  if (!servername) throw new Error('servername is falsy');
  const server = SERVERS[servername];
  if (!server) throw new Error('server is falsy');
  if (!server.users.includes(user)) server.users.push(user);
  response.send(server);
});

app.post('/server/create', (request, response) => {
  const { name, user } = request.body.params;
  if (!name || Object.keys(SERVERS).includes(name)) throw new Error('invalid name');
  if (!user || !Object.keys(USERS).includes(user)) throw new Error('invalid user');
  const newServer = {
    users: [user],
    channels: {
      general: {
        users: [user],
        chat: [],
      },
    },
  };
  SERVERS[name] = newServer;
  response.send(name);
});

app.get('/user/login', (request, response) => {
  const { username, password } = request.query;
  if (USERS[username] === password) { response.sendStatus(200); }
  else { response.send(401); }
});

app.get('/user/servers', (request, response) => {
  const { username } = request.query;
  const userServers = [];
  Object.keys(SERVERS).forEach((server) => {
    if (SERVERS[server].users.includes(username)) userServers.push(server);
  });
  response.send(userServers);
});

app.post('/user/signup', (request, response) => {
  const { username, password } = request.body.params;
  if (!username || typeof username !== 'string') throw new Error('username is not a truthy string');
  if (!password || typeof password !== 'string') throw new Error('password is not a truthy string');
  if (USERS[username]) response.sendStatus(400);
  else { USERS[username] = password; response.sendStatus(200); }
});

app.get('/', (request, response) => {
  response.send('This is the backend');
});

app.listen(5000, () => { console.log('Server is running'); });
