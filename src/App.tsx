import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Users from '@/pages/Admin/Users';
import RolePerms from './pages/Admin/RolePerms';
import { useEffect } from 'react';
import { useAppDispatch } from './redux/hooks/hooks';
import { fetchRoles } from './redux/action/FetchRolesAction';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store/store';
import ChatContainer from './pages/chat';
import ChatIcon from './components/chatCards/ChatIcon';
import ProductsPage from '../src/pages/products';
import WishlistPage from '../src/pages/wishlist';
import RecommendedProducts from '../src/pages/recommended';
import { Helmet } from 'react-helmet';
import { LoginSuccess } from './utils/LoginSuccess';
import ViewItems from './pages/SellerDashboard/viewItems';
import CartPage from './components/CartPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VendorPage from './pages/vendor/VendorPage';
import UpdatePage from './components/UpdateProduct';
import ProductView from './pages/viewProduct';

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
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
        </Helmet>
        <div>
          <Router>
            <ChatIcon />
            <Routes>
              <Route path="/" element={<HomePages />} />
              <Route path="/login" element={<Login />} />
              <Route path="/buyer/signup" element={<SignupPage />} />
              <Route path="/tfa" element={<TwoFactorAuth />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/auth/reset/:token" element={<UpdatePasswordPage />} />
              <Route path="/UpdatePassword" element={<UpdatePassword />} />
              <Route path="/profile" element={<ProfileView />} />
              <Route path="/editProfile" element={<EditProfileView />} />
              <Route path="/login/success" element={<LoginSuccess />} />
              <Route path="/sellerPage" element={<VendorPage />} />
              <Route path="/product/:id" element={<ProductView />} />
              <Route path="/update-product/:id" element={<UpdatePage />} />
              <Route path="/admin/manage/users" element={<ProtectedRoute userRole={roleId ? roleId : 3} allowedRoles={['1']} element={<Users />} />} />
              <Route path="/admin/role/permissions" element={<ProtectedRoute userRole={roleId ? roleId : 3} allowedRoles={['1']} element={<RolePerms />} />} />
              <Route path="/chat" element={<ChatContainer />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/category/:categoryId" element={<ProductsPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/login/success" element={<LoginSuccess />} />
              <Route path="/search/products" element={<Navigate to="/products" />} />
              <Route path="/search/products/:product" element={<ProductsPage />} />
              <Route path="/viewItems" element={<ViewItems />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/products/recommended" element={<RecommendedProducts />} />
            </Routes>
          </Router>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};
export default App;
