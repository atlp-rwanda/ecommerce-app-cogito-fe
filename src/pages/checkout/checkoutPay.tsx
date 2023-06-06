import {useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { fetchUserCart, checkout } from '../../redux/action/checkout/checkout';
import { RootState } from '@/redux/store/store';
import DecodeToken from '@/utils/token';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '@/components/Nav/navBar';
import Footer from '@/components/footer';

const CheckoutComponent = () => {
  const decodedToken = DecodeToken();
  const userId = decodedToken.id;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems:any = useSelector((state: RootState) => state.cartItems.cartItems);

  const checkoutStatus = useSelector((state: RootState) => state.cartItems.checkoutStatus);
  const totalPrice = cartItems.reduce((total:any, item:any) => total + item.total, 0);
  useEffect(() => {
    dispatch(fetchUserCart());
  }, [dispatch]);


  const handleCheckout = async () => {
    try {
      if (checkoutStatus === 'loading') return;
      // toast.info('Processing...', { toastId: 'processing' });

      const response = await dispatch(checkout(userId));
      console.log(response)
      const checkoutSuccessful = response.type === 'cart/checkout/fulfilled';// Use the actual response to determine success
      if (checkoutSuccessful) {
        const orderId = response.payload.order_id;
        const totalCost = response.payload.totalCost;
        localStorage.setItem('orderId', orderId);
        localStorage.setItem('totalCost', totalCost);
        toast.success('Checkout successful!', { toastId: 'success' });
        navigate('/checkout'); // Navigate when checkout is successful
      } else {
        toast.error('Checkout failed. Please try again later.', { toastId: 'error' });
      }
    } catch (error) {
      // Handle error if checkout fails
      console.error(error);
    }
  };
return (
  <div>
  <NavBar />
  <div className='mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2'>
    <div className="bg-gray-50 py-12 md:py-24">
      <div className="mx-auto max-w-lg space-y-8 px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <span className="h-10 w-10 rounded-full bg-blue-700"></span>
          <h2 className="font-bold text-2xl text-gray-900">Checkout</h2>
        </div>
        <div>
          <p className="text-2xl font-medium tracking-tight text-gray-900">
            $ {totalPrice}
          </p>
          <p className="mt-1 text-sm text-gray-600">For the purchase of</p>
        </div>
        <div className="flow-root">
          <ul className="-my-4 divide-y divide-gray-100">
            {cartItems.map((item: any) => (
              <li key={item.id} className="flex items-center gap-4 py-4">
                <img
                  src={item.product.image}
                  alt=""
                  className="h-16 w-16 rounded object-cover"
                />
                <div>
                  <h3 className="text-sm text-gray-900">{item.product.name}</h3>
                  <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                    <div>
                      <dt className="inline">Unit Price: </dt>
                      <dd className="inline">{item.product.price}</dd>
                    </div>
                    <div>
                      <dt className="inline">Qty: </dt>
                      <dd className="inline">{item.quantity}</dd>
                    </div>
                  </dl>
                </div>
                <div>${item.total}</div>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="w-full h-12 px-6 text-white transition-colors font-semibold duration-150 bg-blue-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
          onClick={handleCheckout}
          disabled={checkoutStatus === 'loading'}
        >
          {checkoutStatus === 'loading' ? 'Processing...' : 'Proceed to Pay'}
        </button>
      </div>
    </div>
    <div className="bg-gradient-to-r from-green-400 to-blue-500 py-12 md:py-24 flex flex-col items-center justify-center">
      <h2 className="text-2xl md:text-4xl font-semibold text-white">
        Thank you for shopping with us!
      </h2>
    </div>
  </div>
  <ToastContainer position="top-right" autoClose={2000} />
  <Footer />
</div>
);
};

export default CheckoutComponent;
