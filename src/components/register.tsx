import React from 'react';
import Footer from './../components/Footer/footer';
import NavBar from './../components/Nav/navBar';
import SignupForm from '../pages/register';

const SignupPage: React.FC = () => {
  return (
    <div>
      <NavBar />
      <SignupForm />
      <Footer />
    </div>
  );
};

export default SignupPage;
