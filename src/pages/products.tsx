import React from 'react';
import Footer from '../../src/components/Footer/footer';
import NavBar from '../components/Nav/navBar';
import { ReviewData } from '../components/productForm/reviewForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import apple from '../assets/images/apple.jpg';
interface Product {
  name: string;
  description: string;
  price: number;
}

interface ProductPageProps {
  product: Product;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const handleSubmitReview = async (productId: number, reviewData: ReviewData) => {
    try {
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        console.log('Review submitted successfully!');
      } else {
        console.error('Error submitting the review.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="ml-10 flex">
        <div className="bg-slate-100 w-48  h-44 mt-10">
          <img src={apple} alt="Example" className="w-48 h-48" />

          {/* <img src={apple} alt="Description of the image" /> */}
        </div>
        <div className=" ml-6 mt-10">
          <h1 className="text-emerald-900 font-bold">Apple Watch Series </h1>
          <h2>
            Smooth and seamless. The edge of design. <br />
            Apple Watch Series 8 features a big, <br />
            brilliant Always‑On display.{' '}
          </h2>
          <button className="bg-emerald-950 p-2 mt-2 text-white w-40 rounded-3xl"> Add to cart</button>
          {/* <FontAwesomeIcon icon={fa Heart-circle-plus} /> */}
        </div>
      </div>
      <h2 className="font-bold ml-10 mt-10">Apple Watch series 8’s customer reviews</h2>

      <div className="ml-10 flex mt-2 ">
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon icon={faStar} />
        <FontAwesomeIcon className="text-gray-200  " icon={faStar} />
        <FontAwesomeIcon className="text-gray-200  " icon={faStar} />
        <h1 className="ml-3">3.4/5</h1>
        <h1 className="ml-5">254 Verified Reviews</h1>
        <button className="border border-emerald-950 p-1 text-sm ml-10 rounded-md">Write a review</button>
      </div>
      <div className="flex flex-col ">
        <div className="rounded-full w-14 h-14 bg-emerald-950 ml-8 ">
          <h1 className="text-center p-4 text-white">J</h1>
        </div>
        <div className="flex  flex-col ml-5">
          <div className="flex">
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon className="text-gray-200  " icon={faStar} />
            <FontAwesomeIcon className="text-gray-200  " icon={faStar} />
          </div>
          <h2 className="">John Doe</h2>
          <h3 className="">Reviewed on June 01,2023</h3>
        </div>
      </div>
      <div>
        <h1 className="ml-8 mt-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Ratione a qui accusamus, ipsam eaque dolor, impedit, <br /> sapiente rerum expedita alias labore eveniet. Quia dicta <br /> tempora excepturi
          perferendis repellat beatae deleniti.
        </h1>
        <hr />
      </div>

      {/* <ReviewForm productId={product.id} onSubmitReview={handleSubmitReview} /> */}

      {/* <Pagination /> */}
      <Footer />
    </div>
  );
};

export default ProductPage;
