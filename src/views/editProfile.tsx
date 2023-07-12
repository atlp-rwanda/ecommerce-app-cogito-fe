import React from 'react';
import EditProfilePage from '@/pages/editProfile';
import NavBar from '../components/Nav/navBar';
import Footer from '../components/footer';
const ProfileView: React.FC = () => {
  return (
    <div>
      <NavBar />
      <EditProfilePage />
      <Footer />
    </div>
  );
};
export default ProfileView;
