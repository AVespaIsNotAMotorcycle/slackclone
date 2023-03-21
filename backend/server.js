const generateResponse = require('./responseGenerator');

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' }));

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

app.post('/server/:servername/:channel/:user.:text', (request, response) => {
  const {
    servername,
    channel,
    user,
    text,
  } = request.params;
  SERVERS[servername][channel].chat.push({ user, text });
  SERVERS[servername][channel].chat.push({ user: 'lorem', text: generateResponse() });
  response.send(SERVERS[servername])
});

app.get('/server/:servername.:user', (request, response) => {
  const { servername, user } = request.params;
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
app.get('/login/:user.:password', (request, response) => {
  const { user, password } = request.params;
  if (USERS[user] === password) { response.send(200); }
  else { response.send(401); }
});

app.get('/', (request, response) => {
  response.send('This is the backend');
});

app.listen(5000, () => { console.log('Server is running'); });
