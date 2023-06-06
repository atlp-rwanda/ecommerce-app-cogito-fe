import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@/views/Home';
import Login from '@/pages/Login';
import ResetPasswordPage from '@/pages/resetPassword/resetPassword';
import UpdatePasswordPage from '@/pages/resetPassword/updatePassword';
import SignupPage from "./components/register";

const App: React.FC=() => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/auth/reset/:token" element={<UpdatePasswordPage />} />
          <Route path="/buyer/signup" element={<SignupPage />} />  
        </Routes>
      </Router>
    </div>
  );
}
export default App;
