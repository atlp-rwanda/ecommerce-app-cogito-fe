import Categories from './../components/categories';
import HomePage from '../components/HomePage';
import NavBar from '../components/Nav/navBar';
import Footer from '../components/Footer/footer';
import RecommendProducts from '../components/Recommendation/recommendedSection';

const HomeView = () => {
  return (
    <>
      <NavBar />
      <HomePage />
      <Categories />
      <RecommendProducts />
      <Footer />
    </>
  );
};
export default HomeView;
