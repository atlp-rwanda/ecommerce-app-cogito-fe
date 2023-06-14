import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@/views/Home';
import Login from '@/pages/Login';
import ResetPasswordPage from '@/pages/resetPassword/resetPassword';
import UpdatePasswordPage from '@/pages/resetPassword/updatePassword';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/auth/reset/:token" element={<UpdatePasswordPage />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
