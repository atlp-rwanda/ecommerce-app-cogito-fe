import checkLoggedIn from '@/utils/authorise';
import Wishlist from '../components/wishlist/wishlist';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import NavBar from '@/components/Nav/navBar';
import Footer from '@/components/footer';

const WishlistPage = () => {
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
    return(
        <>
            <NavBar/>
            <Wishlist/>
            <Footer/>
        </>
    );
}

export default WishlistPage;