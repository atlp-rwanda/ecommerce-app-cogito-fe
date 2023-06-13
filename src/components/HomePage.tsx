import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <>
      <h2>Home Page</h2>
      <Link to="/login" className="btn bg-primary p-2">
        Login
      </Link>
    </>
  );
};
export default HomePage;
