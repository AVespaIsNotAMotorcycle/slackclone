import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ChatView.css';

import TextInput from './TextInput';
import TextMessage from './TextMessage';

function generateMessages(chat, user) {
  return chat.map((message) => {
    return <TextMessage message={message} user={user} />;
  });
}

function ChatView({ chat, sendMessage, user }) {
  const [messages, setMessages] = useState(generateMessages(chat, user));

  useEffect(() => {
    setMessages(generateMessages(chat, user));
  }, [chat.length]);

  return (
    <div className="chatview">
      <div className="inputview">
        <TextInput onSubmit={sendMessage} />
      </div>
      <div className="messagesview">
        {messages}
      </div>
    </div>
  );
}

export default ChatView;

ChatView.propTypes = {
  chat: PropTypes.instanceOf(Array),
  sendMessage: PropTypes.func,
  user: PropTypes.string.isRequired,
};

ChatView.defaultProps = {
  chat: [],
  sendMessage: () => {},
}
