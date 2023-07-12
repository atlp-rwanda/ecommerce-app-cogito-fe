import checkLoggedIn from '@/utils/authorise';
import Products from '../components/products';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProductsPage = () => {
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
            <Products/>
        </>
    );
}

export default ProductsPage;