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

function mockResponse() {
  const corpus = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dignissim vulputate libero, vel egestas enim tincidunt id. Phasellus posuere risus ante, vel tincidunt dui sagittis eu. Nulla bibendum euismod leo, eget placerat mauris porta non. Proin lacinia dapibus risus non varius. Aliquam rhoncus lectus vel justo blandit porta. Nunc nec nibh posuere, sollicitudin lectus lobortis, dignissim lectus. In urna sem, mollis ac elit pulvinar, fermentum dictum nisl. Praesent eu lacus dolor. Praesent nec elementum leo, et lobortis mauris. Nam neque nulla, sagittis vel suscipit et, hendrerit et orci. Mauris faucibus orci felis, a varius dolor euismod nec. Nunc elementum mi in ipsum vehicula dignissim. Quisque efficitur congue nisl, ut dictum nisi rhoncus vel.
  `.split(' ');
  const min = Math.random() * 10;
  const max = Math.random() * corpus.length - min;
  const text = corpus.slice(min, max).join(' ');
  console.log(min, max, text);
  return text;
}

app.post('/server/:servername/:channel/:user.:text', (request, response) => {
  const {
    servername,
    channel,
    user,
    text,
  } = request.params;
  SERVERS[servername][channel].chat.push({ user, text });
  SERVERS[servername][channel].chat.push({ user: 'lorem', text: mockResponse() });
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
