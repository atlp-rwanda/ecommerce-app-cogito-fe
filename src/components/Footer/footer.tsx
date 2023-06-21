import { Link } from 'react-router-dom';
import Logo from './../../assets/images/Logo.png';
import payment1 from './../../assets/images/payment11.png';
import payment2 from './../../assets/images/payment22.jpg';
import payment3 from './../../assets/images/payment33.png';
import payment4 from './../../assets/images/payment44.jpg';
import payment5 from './../../assets/images/payment5.png';
import payment62 from './../../assets/images/payment62.png';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { useEffect, useState } from 'react';
import { getCategories } from '../../redux/action/categoryAction';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

type Category = {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

const Footer = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const [showPayments, setShowPayments] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showQuickLinks, setShowQuickLinks] = useState(false);

  const expandPayments = () => {
    setShowPayments(!showPayments);
  };
  const expandCategories = () => {
    setShowCategories(!showCategories);
  };

  const expandLinks = () => {
    setShowQuickLinks(!showQuickLinks);
  };

  const { value } = useSelector((state: RootState) => state.category) || [];
  const categories = value.map((obj: Category) => obj.name);
  return (
    <>
      <hr className="border-t border-[#003D29] mb-8 mt-16 mx-8"></hr>
      <div className="lg:flex lg:mx-16 lg:justify-between lg:w-[90%]">
        <div className='lg:w-[33.3%]'>
          <div className='lg:w-fit lg:w-full'>
            <div className="flex flex-col mx-10 lg:mx-0 mb-4 custom-md:text-sm md:text-base lg:w-full">
              <div className=" lg:w-full">
                <div className='custom-md:flex custom-md:items-center lg:flex lg:flex-col lg:items-start'>
                  <img src={Logo} alt="logo" className="h-9 w-36 md: mb-6 custom-md:mb-4"></img>
                  <p className="lg:w-[90%] md:w-[80%] custom-md:w-[100%] custom-md:mx-20 lg:mx-0">Your one-stop destination for all your shopping needs, delivering quality products and exceptional service at your fingertips.</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <hr className="lg:hidden border-t border-[#003D29] mb-6 mt-10 mx-8"></hr>
            <div className="flex flex-col mx-8 lg:mx-0">
              <div className="flex items-center mb-4 justify-between">
                <p className="font-bold lg:hidden ">Accepted Payments</p>
                <FontAwesomeIcon icon={faPlus} onClick={expandPayments} className='lg:hidden '/>
              </div>
              <div className={`grid grid-cols-3 gap-2 w-fit mb-10 ${!showPayments && 'hidden'} lg:grid`}>
                <div className="px-4 py-2  rounded-md border-[1px] w-fit h-fit">
                  <img src={payment62} alt="Payment method" className="h-5 w-10 "></img>
                </div>
                <div className="px-4 py-2  rounded-md border-[1px] w-fit h-fit">
                  <img src={payment5} alt="Payment method" className="h-5 w-10 "></img>
                </div>
                <div className="px-4 py-2  rounded-md border-[1px] w-fit h-fit">
                  <img src={payment3} alt="Payment method" className="h-5 w-10 "></img>
                </div>
                <div className="px-4 py-2  rounded-md border-[1px] w-fit h-fit">
                  <img src={payment4} alt="Payment method" className="h-5 w-10 "></img>
                </div>
                <div className="px-4 py-2  rounded-md border-[1px] w-fit h-fit">
                  <img src={payment2} alt="Payment method" className="h-5 w-10 "></img>
                </div>
                <div className="px-4 py-2  rounded-md border-[1px] w-fit h-fit">
                  <img src={payment1} alt="Payment method" className="h-5 w-10 "></img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='lg:w-[33.3%] xl:flex xl:flex-col xl:items-center'>
          <hr className="lg:hidden border-t border-[#003D29] mb-6 mx-8"></hr>
          <div className="flex flex-col mx-8">
            <div className="flex items-center mb-4 justify-between">
              <p className="font-bold ">Categories</p>
              <FontAwesomeIcon icon={faPlus} onClick={expandCategories} className='lg:hidden '/>
            </div>
            <div className={`${!showCategories && 'hidden'} mb-10 lg:block`}>
              {categories.map((category) => (
                <p key={category} className="category_link ml-2 mb-2 lg:ml-0">
                  {category}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className='lg:w-[33.3%] xl:flex xl:flex-col xl:items-center'>
          <hr className="lg:hidden border-t border-[#003D29] mb-6 mx-8"></hr>
          <div className="flex flex-col mx-8">
            <div className="flex items-center mb-4 justify-between">
              <p className="font-bold ">Quick Links</p>
              <FontAwesomeIcon icon={faPlus} onClick={expandLinks} className='lg:hidden '/>
            </div>
            <div className={`${!showQuickLinks && 'hidden'} mb-10 flex flex-col lg:flex`}>
              <Link to="/about" className="quick_link  ml-2 mb-2 lg:ml-0">
                About Us
              </Link>
              <Link to="/signup" className="quick_link  ml-2 mb-2 lg:ml-0">
                Account Signup
              </Link>
              <Link to="/contact" className="quick_link  ml-2 mb-2 lg:ml-0">
                Contact Us
              </Link>
              <Link to="/help" className="quick_link  ml-2 mb-2 lg:ml-0">
                Help Center
              </Link>
              <Link to="/seller" className="quick_link  ml-2 mb-2 lg:ml-0">
                Become a Seller
              </Link>
              <Link to="/terms" className="quick_link  ml-2 mb-2 lg:ml-0">
                Terms of Service
              </Link>
              <Link to="/privacy" className="quick_link  ml-2 mb-2 lg:ml-0">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-t border-[#003D29] mb-8 mx-8"></hr>
      <p className="text-center mb-8 custom-md:text-sm md:text-base">All Rights Reserved By Cogito | 2023</p>
    </>
  );
};

export default Footer;
