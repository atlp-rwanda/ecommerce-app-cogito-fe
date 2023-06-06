import { useState } from 'react';
import URL from '@/utils/api';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { empty } from '@/redux/action/CartAction';
import NavBar from '@/components/Nav/navBar';

const Payment = () => {
  const dispatch = useAppDispatch() 
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [orderId] = useState(localStorage.getItem('orderId') || '');
const subTotal = localStorage.getItem('totalCost') || 0;

const handleSubmit = async (e: any) => {
  e.preventDefault();
  try {
    const paymentData = {
      order_id: orderId,
      cardNumber,
      expMonth: parseInt(expiryDate.split('/')[0]),
      expYear: parseInt(expiryDate.split('/')[1]),
      cvc,
    };
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await URL.post('/checkout/pay', paymentData, config);
    if (response.status === 200) {
      // Payment successful, proceed to clear the cart and navigate to the order status page.
      dispatch(empty()).then(({ payload }) => {
        const { status } = payload;
        if (status === 200) {
          // Cart cleared successfully.
          // Proceed to remove order related data and navigate to the order status page.
          localStorage.removeItem('orderId');
          localStorage.removeItem('totalCost');
          navigate(`/orderStatus/${orderId}`);
        } else {
          // Handle cart clearing failure (if needed)
        }
      });
    } else {
      // Handle payment failure
    }
  } catch (error) {
    console.error(error);
  }
};
  const handlePaymentClick = async (e:any) => {
    // Simulating payment processing with a delay (you would replace this with actual payment processing logic)
    setIsProcessing(true);
    try {
      await handleSubmit(e) 
    } catch (error) {
      console.error(error);
    }
    setIsProcessing(false);
  };

  return (
    <div>
      <NavBar />
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl text-gray-500 text-center font-bold mb-4 uppercase">Pay to checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 content-center">
          <label htmlFor="cardNumber" className="block text-gray-700 font-bold">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            className="form-input text-center mt-1 block w-full bg-gray-300 px-2 py-1 rounded-md"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="xxxx xxxx xxxx xxxx"
            required
          />
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
            <label htmlFor="expiryDate" className="block text-gray-700 font-bold">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              className="form-input text-center mt-1 block w-full bg-gray-300 px-2 py-1 rounded-md"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label htmlFor="cvc" className="block text-gray-700 font-bold">
              CVC
            </label>
            <input
              type="text"
              id="cvc"
              className="form-input text-center mt-1 block w-full bg-gray-300 px-2 py-1 rounded-md"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              placeholder="123"
              required
            />
          </div>
        </div>
        <div className="flex py-2 px-4">
  <ul className="flex-1">
    <li className="flex justify-between mb-2">
      <span className='font-semibold'>Subtotal</span>
      <span className='font-semibold'>$ {subTotal}</span>
    </li>
    <li className="flex justify-between mb-2">
      <span className='font-semibold'>Shipping</span>
      <span className='font-semibold'>$ 0</span>
    </li>
    <li className="flex justify-between mb-2">
      <span className='font-semibold'>Taxes</span>
      <span className='font-semibold'>$ 0</span>
    </li>
  </ul>
</div>
<div className='w-full bg-gray-900 h-1 mb-4'></div>
<div className='flex py-2 px-4'>
<ul className="flex-1">
    <li className="flex justify-between mb-2">
      <span className='font-semibold'>Total</span>
      <span className='font-semibold'>$ {subTotal}</span>
    </li>
    </ul>
</div>
<button
      type="submit"
      className="w-full h-12 px-6 text-white transition-colors font-semibold duration-150 bg-blue-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
      onClick={handlePaymentClick}
      disabled={isProcessing} // Disable the button while processing is in progress
    >
      {isProcessing ? 'Processing...' : 'Make Payment'}
    </button>
      </form>
    </div>
    </div>
  );
};

export default Payment;
