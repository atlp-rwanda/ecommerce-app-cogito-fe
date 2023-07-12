import checkLoggedIn from '@/utils/authorise';
import Wishlist from '../components/wishlist';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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
            <Wishlist/>
        </>
    );
}

export default WishlistPage;