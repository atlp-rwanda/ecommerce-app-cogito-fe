import Footer from './../components/Footer/footer';
import NavBar from './../components/Nav/navBar';
import Categories from './../components/categories';
import { Signup } from "../components/Button";
import HomePage from "../components/HomePage";

const HomeView = () => {
  return (
    <>
      <NavBar />
      <Categories />
      <Footer />
      <HomePage />
      <Signup label="Sign Up" backgroundColor="#1B5E20" to="/buyer/signup"/>
    </>
  );
};
export default HomeView;