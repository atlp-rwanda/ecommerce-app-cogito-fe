import React from 'react';

import { UpdatePasswordPage } from '../components/UpdatePassword';
import NavBar from '../components/Nav/navBar';
import Footer from '../components/Footer/footer';
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
