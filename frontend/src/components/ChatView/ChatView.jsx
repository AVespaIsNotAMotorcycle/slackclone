import React from 'react';
import './ChatView.css';

import TextInput from './TextInput';

function ChatView() {
  return (
    <div className="chatview">
      <div className="messagesview">
      </div>
      <div className="inputview">
        <TextInput />
      </div>
    </div>
  );
}

export default ChatView;
