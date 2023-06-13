import { Link } from 'react-router-dom';
import Logo from './../../assets/images/Logo.png';
import payment1 from './../../assets/images/payment11.png';
import payment2 from './../../assets/images/payment22.jpg';
import payment3 from './../../assets/images/payment33.png';
import payment4 from './../../assets/images/payment44.jpg';
import payment5 from './../../assets/images/payment5.png';
import payment62 from './../../assets/images/payment62.png';

const Footer = () => {
  const categories = ['Fashion', 'Education products', 'Frozen Foods', 'Beverages', 'Organic Groceries', 'Office Supplies', 'Books', 'Beauty Products', 'Electronic Gadgets', 'Fitness', 'Sneakers'];
  return (
    <>
      <hr className="border-t border-[#003D29] mb-12 mt-16 mx-8"></hr>
      <div className="flex mx-16 mb-10 custom-md:text-sm md:text-base">
        <div className="md:w-1/3 custom-md:w-[40%]">
          <img src={Logo} alt="logo" className="h-9 w-36 md: mb-6 custom-md:mb-4"></img>
          <p className="w-[90%]">Your one-stop destination for all your shopping needs, delivering quality products and exceptional service at your fingertips.</p>
          <div className="grid grid-cols-3 gap-2 mt-10 lg:w-[65%] custom-md:w-[90%]">
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
        <div className="w-1/3 flex flex-col items-center text-left	">
          <div className="text-left">
            <p className="font-bold mb-6 md:text-lg custom-md:text-base ">Categories</p>
            {categories.map((category) => (
              <p key={category} className="category_link">
                {category}
              </p>
            ))}
          </div>
        </div>
        <div className="w-1/3 flex flex-col items-center text-left	">
          <div className="text-left">
            <p className="font-bold md:text-lg mb-6 custom-md:text-base">Quick Links</p>
            <Link to="/about" className="quick_link">
              About Us
            </Link>
            <Link to="/signup" className="quick_link">
              Account Signup
            </Link>
            <Link to="/contact" className="quick_link">
              Contact Us
            </Link>
            <Link to="/help" className="quick_link">
              Help Center
            </Link>
            <Link to="/seller" className="quick_link">
              Become a Seller
            </Link>
            <Link to="/terms" className="quick_link">
              Terms of Service
            </Link>
            <Link to="/privacy" className="quick_link">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
      <hr className="border-t border-[#003D29] mb-8 mt-16 mx-8"></hr>
      <p className="text-center mb-8 custom-md:text-sm md:text-base">All Rights Reserved By Cogito | 2023</p>
    </>
  );
};

export default Footer;