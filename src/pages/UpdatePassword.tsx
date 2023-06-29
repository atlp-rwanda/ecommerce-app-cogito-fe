import React from 'react';
import Footer from './../components/Footer/footer';
import NavBar from './../components/Nav/navBar';

import { UpdatePasswordPage } from '../components/UpdatePassword';
const updatePassword: React.FC = () => {
  return (
    <div>
      <NavBar />
      <UpdatePasswordPage />
      <Footer />
    </div>
  );
};
export default updatePassword;
