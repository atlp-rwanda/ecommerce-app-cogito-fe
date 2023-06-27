import TwoFactorAuthComponent from '../components/TwoFactorAuth';
import Footer from '../components/Footer/footer';
import NavBar from '../components/Nav/navBar';
function TwoFactorAuth() {
  return (
    <>
      <NavBar />
      <TwoFactorAuthComponent />
      <Footer />
    </>
  );
}

export default TwoFactorAuth;
