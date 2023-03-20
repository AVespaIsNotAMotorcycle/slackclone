const generateResponse = require('./responseGenerator');

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: '*' }));

const SERVERS = {
  test_server: {
    general: {
      users: ['localUser', 'lorem'],
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

app.get('/server/:servername', (request, response) => {
  const servername = request.params.servername;
  response.send(SERVERS[servername]); 
});

app.get('/', (request, response) => {
  response.send('This is the backend');
});

app.listen(5000, () => { console.log('Server is running'); });
