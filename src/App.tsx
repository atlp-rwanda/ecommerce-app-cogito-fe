import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '@/views/Login';
import HomePage from '@/views/Home';
import ResetPasswordPage from '@/pages/resetPassword';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
