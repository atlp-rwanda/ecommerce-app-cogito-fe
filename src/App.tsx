import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute';
import Login from '@/pages/Login';
import ResetPasswordPage from '@/views/resetPassword';
import UpdatePasswordPage from '@/views/updatePassword';
import SignupPage from './components/register';
import HomePages from '../src/views/Home';
import TwoFactorAuth from './pages/TwoFactorAuth';
import UpdatePassword from './pages/UpdatePassword';
import ProfileView from './views/Profile';
import EditProfileView from './views/editProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VendorPage from './pages/vendor/VendorPage';
import UpdatePage from './components/UpdateProduct';
import ProductView from './pages/viewProduct';
import Users from '@/pages/Admin/Users';
import { LoginSuccess } from './utils/LoginSuccess';
import RolePerms from './pages/Admin/RolePerms';
import { useEffect } from 'react';
import { useAppDispatch } from './redux/hooks/hooks';
import { fetchRoles } from './redux/action/FetchRolesAction';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store/store';

const App: React.FC = () => {
  const { roles } = useSelector((state: RootState) => state.roles);
  const { data } = useSelector((state: RootState) => state.login);
  const dispatch = useAppDispatch();
  const roleId = localStorage.getItem('roleId') ? localStorage.getItem('roleId') : 3;
  useEffect(() => {
    dispatch(fetchRoles);
    console.log(roles);
  }, [data, dispatch]);
  return (
    <>
      <div className="h-screen">
        <Router>
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
            <Route path="/admin/manage/users" element={<ProtectedRoute userRole={roleId ? roleId : 3} allowedRoles={['1']} element={<Users />} />} />
            <Route path="/admin/role/permissions" element={<ProtectedRoute userRole={roleId ? roleId : 3} allowedRoles={['1']} element={<RolePerms />} />} />
          </Routes>
        </Router>
        <ToastContainer />
      </div>
    </>
  );
};
export default App;
