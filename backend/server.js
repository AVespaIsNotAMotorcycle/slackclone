const generateResponse = require('./responseGenerator');

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

const SERVERS = {
  test_server: {
    users: ['sam', 'lorem'],
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
};
app.get('/login', (request, response) => {
  const { username, password } = request.query;
  if (USERS[username] === password) { response.send(200); }
  else { response.send(401); }
});

app.get('/', (request, response) => {
  response.send('This is the backend');
});

app.listen(5000, () => { console.log('Server is running'); });
