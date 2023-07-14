import { LoginPage } from '../components/Login';
import NavBar from '../components/Nav/navBar';
import Footer from '../components/Footer/footer';
const Login: React.FC = () => {
  return (
    <div>
      <NavBar />
      <LoginPage />
      <Footer />
    </div>
  );
};
export default Login;
