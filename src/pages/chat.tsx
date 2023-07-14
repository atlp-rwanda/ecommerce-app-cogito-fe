import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import io from 'socket.io-client';
import ChatHeader from '@/components/chatCards/chatHeader';

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const messagesRef = useRef(null);

  useEffect(() => {
    const socket = io('http://localhost:9090');

    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:9090/chat/messages/all');
        const messagesData = response.data.data;

        setMessages(messagesData);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    const handleChatMessage = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    const handleUserJoined = (name) => {
      setMessages((prevMessages) => [...prevMessages, { message: `${name} has joined the chat` }]);
    };

    const initializeChat = () => {
      let userName = prompt('Enter your name:');

      while (!userName.trim()) {
        userName = prompt('Please enter a valid name:');
      }

      setName(userName);
      socket.emit('user joined', userName);
      console.log(`${userName} has joined the chat`);

      socket.on('chat message', handleChatMessage);
      socket.on('user joined', handleUserJoined);

      fetchMessages();

      return () => {
        socket.off('chat message', handleChatMessage);
        socket.off('user joined', handleUserJoined);
      };
    };

    initializeChat();
  }, []);

  useEffect(() => {
    messagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;

    if (!message.trim()) {
      return; // Do not send empty messages
    }

    const postMessageEndpoint = 'http://localhost:9090/chat/messages/send';
    const postData = {
      message: message,
      sender: name,
    };

    try {
      await axios.post(postMessageEndpoint, postData);
      messageInput.value = '';
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

  return (
    <div className="chat-container">
    < ChatHeader />
      <div className="chat-box flex h-screen flex-col bg-gray-100">
        <div className="flex-grow overflow-y-auto">
          <div className="flex flex-col space-y-2 p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col ${message.sender === name ? 'self-end' : 'self-start'}`}
              >
                <div
                  className={`flex items-center rounded-xl py-2 px-3 ${
                    message.sender === name ? 'rounded-tr bg-blue-500 text-white' : 'rounded-tl bg-gray-300'
                  }`}
                  style={{ marginBottom: '0.5rem', padding: '0.5rem', textTransform: 'capitalize' }}
                >
                  <p>{message.sender}</p>
                </div>
                <div
                  className={`bg-white p-4 rounded-xl ${
                    message.sender === name ? 'rounded-br-none' : 'rounded-bl-none'
                  }`}
                >
                  <p>{message.message}</p>
                  <p className="text-xs text-gray-500" style={{ marginTop: '0.5rem', textAlign: 'right' }}>
                    {moment(message.createdAt).format('MMM D, YYYY h:mm A')}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesRef}></div>
          </div>
        </div>
        <div>
          <form className="chat-form p-4 flex items-center" onSubmit={handleSendMessage}>
            <input
              type="text"
              id="message-input"
              autoComplete="off"
              placeholder="Enter your message..."
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            />
            <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
