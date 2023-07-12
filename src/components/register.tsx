import React from 'react';
import SignupForm from '../pages/register';
import NavBar from '../components/Nav/navBar';
import Footer from '../components/Footer/footer';

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
