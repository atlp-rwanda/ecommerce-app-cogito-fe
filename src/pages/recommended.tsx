import NavBar from '../components/Nav/navBar';
import Footer from '../components/Footer/footer';
import checkLoggedIn from '../utils/authorise';
import RecommendationPagination from '../components/Recommendation/RecommendationPagination';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Recommended = () => {
  const isUserLoggedIn = checkLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate('/login');
    }
  }, [isUserLoggedIn, navigate]);

  if (!isUserLoggedIn) {
    return null;
  }
  return (
    <>
      <NavBar />
      <RecommendationPagination />
      <Footer />
    </>
  );
};

export default Recommended;
