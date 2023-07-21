import { useCallback, useEffect} from 'react';
import { useSelector } from 'react-redux';
import DecodeToken from '@/utils/token';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { getOrderStatus } from '../../redux/action/checkout/getOrder';
import { RootState } from '@/redux/store/store';
import moment from 'moment';
import NavBar from '@/components/Nav/navBar';
import { Link, useParams } from 'react-router-dom';

const OrderDetails = () => {
    const {id}= useParams();
  const dispatch = useAppDispatch();
  const orderStatus = useSelector((state: RootState) => state.orderStatus);
const fetchStatus = useCallback(() => {
    dispatch(getOrderStatus(id));
},[dispatch, id])
useEffect(() => {
    fetchStatus()
},[fetchStatus]);
const orderData: any = orderStatus.state.data;
  const orderNumber = orderData.order_id;
    
const formattedDate = moment(orderData.createdAt).format('YYYY-MM-DD HH:mm:ss');

  const decodedToken = DecodeToken();
  const userName = decodedToken.name;
  return (
    <div>
        <NavBar />
    <div className="mx-auto max-w-screen-2xl px-4 md:px-6 lg:px-8 2xl:px-20 py-8">
  <div className="px-4 py-2 mb-4">
    <h2 className="font-bold text-2xl text-gray-500">Your order has been confirmed</h2>
    <h3 className="font-semibold text-xl text-gray-500"> Hi! {userName}</h3>
    <p className='font-semibold text-gray-400'>Your order has been confirmed and will be shipping soon</p>
  </div>
  <div className="bg-gray-900 h-1 mb-4"></div>
  <div className="flex flex-col md:flex-row justify-between mb-6">
    <div className="py-2 md:py-0 md:w-1/3 text-center">
      <span className="font-semibold ">Order</span>
      <p className="font-mediumbold text-gray-400">#{orderNumber}</p>
    </div>
    <div className="py-2 md:py-0 md:w-1/3 text-center">
      <span className="font-semibold ">Date</span>
      <p className="font-mediumbold text-gray-400">{formattedDate}</p>
    </div>
  </div>
  <div className="flex flex-col md:flex-row justify-between">
    <div className="py-2  text-center">
      <span className="font-semibold ">Shipping address</span>
      {orderData.shippingAddress && (
        <p className="w-48 lg:w-full dark:text-gray-500 xl:w-48 text-center md:text-center text-sm leading-5 text-gray-600">
          {orderData.shippingAddress.join(', ')}
        </p>
      )}
    </div>
    <div className="py-2 text-center">
      <span className="font-semibold ">Billing Address</span>
      {orderData.shippingAddress && (
        <p className="w-48 lg:w-full dark:text-gray-500 xl:w-48 text-center md:text-center text-sm leading-5 text-gray-600">
          {orderData.shippingAddress.join(', ')}
        </p>
      )}
    </div>
    <div className="py-2 px-8 text-center">
      <span className="font-semibold ">Contact Help</span>
      <p className="w-48 lg:w-full dark:text-gray-500 xl:w-48 text-center md:text-center text-sm leading-5 text-gray-600">
        (+250)-781-234-8928
      </p>
      <p className="w-48 lg:w-full dark:text-gray-500 xl:w-48 text-center md:text-center text-sm leading-5 text-gray-600">
        cogito.ecommerce@gmail.com
      </p>
    </div>
  </div>
  <div className="flex justify-center mb-4">
      <Link to="/profile" className="text-blue-500 hover:underline font-semibold">
        EDIT DETAILS
      </Link>
    </div>
  <div className="bg-gray-900 h-1 mb-4"></div>
  <div className="flex py-2 px-4">
    <ul className="flex-1">
      <h2 className="text-2xl font-bold text-gray-500">Summary</h2>
      <li className="flex justify-between mb-2">
        <span className='font-semibold text-gray-400'>Payment Status</span>
        <span className='font-semibold text-gray-400 capitalize'>{orderData.paymentStatus}</span>
      </li>
      <li className="flex justify-between mb-2">
        <span className='font-semibold text-gray-400'>Shipping Status</span>
        <span className='font-semibold text-gray-400 capitalize'>{orderData.shippingStatus}</span>
      </li>
      <li className="flex justify-between mb-2">
        <span className='font-semibold text-gray-400'>Tracking Number</span>
        <span className='font-semibold text-gray-400'>{orderData.Tracking}</span>
      </li>
    </ul>
  </div>
  <div className='w-full bg-gray-900'>
    <div className='flex py-2 px-4 justify-center'>
      <div className="w-full flex justify-between  mb-2 bg-gray-900 h-10 ">
        <span className='font-semibold text-gray-300 capitalize'>Amount paid</span>
        <span className='font-semibold text-gray-300'>$ {orderData.totalCost}</span>
      </div>
    </div>
  </div>
</div>
<div className="flex justify-center">
      <Link to="/cart" className="text-blue-500 hover:underline font-semibold">
        CONTINUE SHOPPING
      </Link>
    </div>
</div>
  )
};
export default OrderDetails;
