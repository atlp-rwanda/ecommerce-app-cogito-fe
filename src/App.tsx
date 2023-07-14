import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '@/pages/Login';
import ResetPasswordPage from '@/pages/resetPassword/resetPassword';
import UpdatePasswordPage from '@/pages/resetPassword/updatePassword';
import SignupPage from './components/register';
import HomePages from '../src/views/Home';
import TwoFactorAuth from './pages/TwoFactorAuth';
import UpdatePassword from './pages/UpdatePassword';
import ProfileView from './views/Profile';
import EditProfileView from './views/editProfile';
import NavBar from './components/Nav/navBar';
import Footer from './components/Footer/footer';
import { LoginSuccess } from './utils/LoginSuccess';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VendorPage from './pages/vendor/VendorPage';
import UpdatePage from './components/UpdateProduct';
import ProductView from './pages/viewProduct'

const App: React.FC = () => {
  return (
    <>
      <div></div>

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
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/editProfile" element={<EditProfileView />} />
            <Route path="/login/success" element={<LoginSuccess />} />
            <Route path="/sellerPage" element={<VendorPage />} />
            <Route path="/product/:id" element={<ProductView />} />
            <Route path="/update-product/:id" element={<UpdatePage />} />
          </Routes>
          <Footer />
        </Router>
        <ToastContainer />
      </div>
    </>
  );
};
export default App;