const generateResponse = require('./responseGenerator');

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

const SERVERS = {
  test_server: {
    users: ['sam', 'lorem', 'sam2'],
    general: {
      users: ['sam', 'lorem'],
      chat: [
        { user: 'lorem', text: 'Welcome to the server!' },
      ],
    },
  },
};

app.post('/server/:servername/:channel/', (request, response) => {
  const {
    servername,
    channel,
  } = request.params;
  const { user, text } = request.body;
  SERVERS[servername][channel].chat.push({ user, text });
  SERVERS[servername][channel].chat.push({ user: 'lorem', text: generateResponse() });
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

const USERS = {
  sam: 'testpassword',
  sam2: 'testpassword2',
};
app.get('/user/login', (request, response) => {
  const { username, password } = request.query;
  if (USERS[username] === password) { response.send(200); }
  else { response.send(401); }
});

app.post('/user/signup', (request, response) => {
  const { username, password } = request.body.params;
  if (!username || typeof username !== 'string') throw new Error('username is not a truthy string');
  if (!password || typeof password !== 'string') throw new Error('password is not a truthy string');
  console.log(username, password, USERS[username]);
  if (USERS[username]) response.sendStatus(400);
  else { USERS[username] = password; response.sendStatus(200); }
});

app.get('/', (request, response) => {
  response.send('This is the backend');
});

app.listen(5000, () => { console.log('Server is running'); });
