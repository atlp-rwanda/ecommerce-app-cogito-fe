import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const ChatIcon:React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsVisible(location.pathname !== '/chat');
  }, [location]);

  return (
    <>
      {isVisible && (
        <Link to="/chat">
          <div className="fixed bottom-4 right-4 z-50 bg-blue-500 text-white rounded-full p-2">
            <FontAwesomeIcon icon={faComment} size="lg" />
          </div>
        </Link>
      )}
    </>
  );
};

export default ChatIcon;
