import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '@/pages/Login';
import ResetPasswordPage from '@/pages/resetPassword/resetPassword';
import UpdatePasswordPage from '@/pages/resetPassword/updatePassword';
import SignupPage from './components/register';
import HomePages from '../src/views/Home';
import TwoFactorAuth from './pages/TwoFactorAuth';
import UpdatePassword from './pages/UpdatePassword';
<<<<<<< HEAD
import ProfileView from "./views/Profile";
import EditProfileView from "./views/editProfile";
import NavBar from './components/Nav/navBar';
import Footer from './components/Footer/footer';
import { LoginSuccess } from './utils/LoginSuccess';
=======
import UpdateProduct from "../src/views/UpdateProduct";
>>>>>>> 2edfa71 ( feat(Update Produc):a seller should updste product item)

const App: React.FC = () => {
  return (
    <>
      <div>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePages />} />
            <Route path="/login" element={<Login />} />
            <Route path="/buyer/signup" element={<SignupPage />} />
            <Route path="/tfa" element={<TwoFactorAuth />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/auth/reset/:token" element={<UpdatePasswordPage />} />
            <Route path="/UpdatePassword" element={<UpdatePassword />} />;
<<<<<<< HEAD
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/editProfile" element={<EditProfileView />} />
            <Route path= "/login/success" element={<LoginSuccess />} />;
=======
            <Route path="/UpdateProduct" element={<UpdateProduct />} />
>>>>>>> 2edfa71 ( feat(Update Produc):a seller should updste product item)
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
};
export default App;
