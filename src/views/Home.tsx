import Categories from './../components/categories';
import HomePage from '../components/HomePage';
import NavBar from '../components/Nav/navBar';
import Footer from '../components/Footer/footer';
const HomeView = () => {
  return (
    <>
      <NavBar />
      <HomePage />
      <Categories />
      <Footer />
    </>
  );
};
export default HomeView;
