import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ChatView.css';

import TextInput from './TextInput';
import TextMessage from './TextMessage';

function generateMessages(chat) {
  return chat.map((message) => <TextMessage text={message.text} />);
}

function ChatView({ chat, sendMessage }) {
  const [messages, setMessages] = useState(generateMessages(chat));

  useEffect(() => {
    setMessages(generateMessages(chat));
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
};

ChatView.defaultProps = {
  chat: [],
  sendMessage: () => {},
}
