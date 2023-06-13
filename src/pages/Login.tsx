import Footer from './../components/Footer/footer';
import NavBar from './../components/Nav/navBar';
import { LoginPage } from "../components/Login";
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