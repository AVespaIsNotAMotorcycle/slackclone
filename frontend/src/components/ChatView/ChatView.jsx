import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ChatView.css';

import ServerContext from '../../utils/ServerContext';
import TextInput from './TextInput';
import TextMessage from './TextMessage';

function generateMessages(chat, user) {
  return chat.map((message) => {
    return <TextMessage key={message.text} message={message} user={user} />;
  });
}

function ChatView({ channel }) {
  const {
    channels,
    sendMessage,
    server,
    user,
  } = useContext(ServerContext);
  const chat = (channels.includes(channel)
                ? server[channel].chat
                : []);
  const [messages, setMessages] = useState(generateMessages([], user));

  useEffect(() => {
    if (!server[channel]) { return; }
    const chat = server[channel].chat;
    setMessages(generateMessages(chat, user));
  }, [server]);

  return (
    <div className="chatview">
      <div className="inputview">
        <TextInput channel={channel} onSubmit={sendMessage} />
      </div>
      <div className="messagesview">
        {messages}
      </div>
    </div>
  );
}

export default ChatView;

ChatView.propTypes = {
  channel: PropTypes.string,
};

ChatView.defaultProps = {
  channel: '',
};
