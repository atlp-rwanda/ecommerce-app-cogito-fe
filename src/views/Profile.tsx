import React from 'react';
import ProfilePage from '@/pages/userProfile';
import NavBar from '../components/Nav/navBar';
import Footer from '../components/Footer/footer';
const ProfileView: React.FC = () => {
  return (
    <div>
      <NavBar />
      <ProfilePage />
      <Footer />
    </div>
  );
};
export default ProfileView;
