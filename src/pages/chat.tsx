import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/hooks/hooks';
import moment from 'moment';
import { fetchMessages, sendMessageAsync } from '../redux/action/chatAtion';
import io from 'socket.io-client';
import { RootState } from '@/redux/store/store';
import console from 'console';
import ChatHeader from '@/components/chatCards/chatHeader';
import DecodeToken from '@/utils/token';

const url: any = process.env.VITE_BN_APP_API_BASE_URL;
const socket = io(url);

const ChatComponent = () => {
  const dispatch = useAppDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const [showPopup, setShowPopup] = useState(true);
  const [userJoined, setUserJoined] = useState('');
  const messageInputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  useEffect(() => {
    const decodedToken = DecodeToken();
    if (decodedToken && decodedToken.name) {
      setShowPopup(false);
      socket.emit('user joined', decodedToken.name);
      setName(decodedToken.name);
    } else {
      setShowPopup(true);
    }
  }, []);

  useEffect(() => {
    socket.on('chat message', (message) => {
      dispatch(sendMessageAsync(message));
    });
    socket.on('user joined', (user) => {
      setUserJoined(user);
    });

    return () => {
      socket.off('chat message');
      socket.off('user joined');
    };
  }, [dispatch]);

  useLayoutEffect(() => {
    const messagesContainer = messagesRef.current;
    if (messagesContainer) {
      const lastMessage = messagesContainer.lastElementChild;
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  }, [messages]);

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    const messageInput = messageInputRef.current;
    if (!messageInput) {
      return;
    }

    const message = messageInput.value;
    if (!message.trim()) {
      return;
    }

    try {
      socket.emit('chat message', message);
      await dispatch(sendMessageAsync({ sender: name, message: message }));
      messageInput.value = '';
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

  const handleNameSubmit = (e: any) => {
    e.preventDefault();
    if (name.trim()) {
      setShowPopup(false);
      socket.emit('user joined', name);
    }
  };

  return (
    <div className="chat-container">
      <ChatHeader />
      {showPopup && (
        <div className="name-popup relative left-[40%] mt-20  w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleNameSubmit}>
            <label className="block text-gray-500 font-bold mb-2">WELCOME TO E-COGITO CHAT</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2" type="submit">Submit</button>
          </form>
        </div>
      )}
      {!showPopup && (
        <div className="chat-box flex h-screen flex-col bg-gray-100">
          {userJoined && (
            <div className="user-joined">
              <p className="block font-bold uppercase px-4 py-2 text-gray-500  bg-white  rounded-xl ">{`${userJoined} has joined the chat`}</p>
            </div>
          )}
          <div className="flex-grow overflow-y-auto">
            <div className="flex flex-col space-y-2 p-4" ref={messagesRef}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${message.sender === name ? 'self-end' : 'self-start'}`}
                >
                  <div
                    className={`flex items-center rounded-xl py-2 px-3 ${
                      message.sender === name ? 'text-gray-500' : 'text-gray-500'
                    }`}
                    style={{ marginBottom: '0.5rem', padding: '0.5rem', textTransform: 'capitalize' }}
                  >
                    <p>{message.sender}</p>
                  </div>
                  <div
                    className={`p-4 rounded-xl ${
                      message.sender === name ? 'bg-blue-400 text-white' : 'bg-white'
                    }`}
                  >
                    <p>{message.message}</p>
                    <p className="text-xs text-gray-500" style={{ marginTop: '0.5rem', textAlign: 'right' }}>
                      {moment(message.createdAt).format('MMM D, YYYY h:mm A')}
                    </p>
                  </div>
                </div>
              ))}
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
                ref={messageInputRef}
              />
              <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg" type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
