import Categories from './../components/categories';
import HomePage from '../components/HomePage';
import NavBar from '../components/Nav/navBar';
import Footer from '../components/Footer/footer';

type Props = {
  socket: object
}

const HomeView = ({socket}:Props) => {
  return (
    <>
      <NavBar socket={socket} />
      <HomePage />
      <Categories />
      <Footer />
    </>
  );
};
export default HomeView;
