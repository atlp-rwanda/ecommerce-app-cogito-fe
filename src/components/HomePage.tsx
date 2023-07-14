import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

const HomePage: React.FC = () => {
  return (
    <>
      <div className="bg-[#bae1f4] hero-bg-md:bg-hero-bg bg-cover hero-bg:bg-center min-h-[85vh] flex flex-col justify-center items-start hero-bg-md:pl-24 hero-bg-md:items-start items-center">
        <p className="font-bold hero-bg-md:text-4xl text-3xl text-[#003D29] hero-bg-md:max-w-xs hero-bg-md:mb-4 mb-3 max-w-[80%] text-center hero-bg-md:text-left">Shooping And Department Store</p>
        <p className="hero-bg-md:max-w-xs mb-4 max-w-[80%] hero-bg-sm:max-w-[50%] text-center hero-bg-md:text-left text-lg hero-bg-md:mb-6 mb-8">Get whatever you need from the best sellers and the best price</p>
        <Link to="/products/all">
          <Button label="Get Started" style="bg-[#003D29] text-white hero-bg-md:px-10 hero-bg-md:w-fit w-[40%] py-2 rounded-3xl" />
        </Link>
      </div>
    </>
  );
};
export default HomePage;
