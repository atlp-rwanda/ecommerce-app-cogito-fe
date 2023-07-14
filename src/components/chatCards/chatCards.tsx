import React from 'react';
import {Message} from '../../types/chatTypes'


const ChatCard: React.FC<Message> = ({ message, sender, createdAt }) => {
  return (
    <div className="chat-card flex-grow overflow-y-auto">
      <div className="user-initials">{sender}</div>
      <p>{message}</p>
      <span>{createdAt}</span>
    </div>
  );
};

export default ChatCard;
