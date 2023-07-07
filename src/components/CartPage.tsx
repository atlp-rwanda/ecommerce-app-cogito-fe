import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {fetchCart, empty, incrementDecrement} from '../redux/action/CartAction';
import { RootState } from '@/redux/store/store';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import NavBar from './Nav/navBar';
import Footer from './footer';

const CartPage: React.FC = () => {
  const {items} = useSelector((state:RootState)=> state.cart);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  const handleIncreaseQuantity = (itemId: number, quantity:number) => {
    const neededQuantity = quantity+1;
    dispatch(incrementDecrement({itemId, neededQuantity})).then(({payload})=>{
      const {message} = payload;
        if(message){
          dispatch(fetchCart());
        }
    })
  };

  const handleDecreaseQuantity = (itemId: number,quantity:number) => {
    if(quantity > 1){
      const neededQuantity = quantity-1;
      dispatch(incrementDecrement({itemId, neededQuantity})).then(({payload})=>{
        const {message} = payload;
        if(message){
          dispatch(fetchCart());
        }
      })
    }
  };

  const cartTotal = items.reduce(
    (total: number, item: any) => total + item.total,
    0
  );
const handleClearCart = ()=>{
  dispatch(empty()).then(({payload})=>{
      const {status} = payload;
      if(status === 200){
       dispatch(fetchCart());
      }
  })
}


  return (
    <div>
      <NavBar/>
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Cart</h2>
        <button className="flex items-center px-2 py-1 text-gray-700 rounded-full hover:text-gray-900 border border-gray-300" onClick={()=>{navigate('/products')}}>
          <span className="mr-1">&#8592;</span> Continue Shopping
        </button>
        <button
            className="text-sm md:text-base text-[#EA3A5B] py-1.5 px-3 md:px-4 border-[1px] border-[#EA3A5B] rounded-lg opacity-80 border-opacity-80"
            onClick={() => {
             handleClearCart();
            }}
          >
            Empty Cart
          </button>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Product</th>
            <th className="text-left">Price</th>
            <th className="text-left">Quantity</th>
            <th className="text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item:any) => (
            <tr key={item.product.id}>
              <td className="flex items-center">
                <img
                  src={item.product.image[0]}
                  alt={item.product.name}
                  className="w-10 h-10 mr-4"
                />
                <h3>{item.product.name}</h3>
              </td>
              <td>{item.product.price}</td>
              <td>
                <button
                  onClick={() => handleDecreaseQuantity(item.product.id,item.quantity)}
                  className="px-2 py-1 bg-gray-200 mr-2"
                >
                  -
                </button>
                {item.quantity}
                <button
                  onClick={() => handleIncreaseQuantity(item.product.id,item.quantity)}
                  className="px-2 py-1 bg-gray-200 ml-2"
                >
                  +
                </button>
              </td>
              <td>{item.quantity * item.product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4 className="font-bold mt-4">Cart Total: {cartTotal}</h4>
    </div>
    <Footer/>
    </div>
  );
};

export default CartPage;
