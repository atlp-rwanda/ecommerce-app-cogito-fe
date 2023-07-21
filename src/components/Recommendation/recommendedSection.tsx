import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { RootState } from '../../redux/store/store';
import { getAllRecommendedProducts } from '../../redux/action/Recommended';
import { faHeartCirclePlus, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Product } from '../../types/searchTypes';
import { Link } from 'react-router-dom';
import { Button } from '../Button';

const RecommendProducts = () => {
  const dispatch = useAppDispatch();
  const roleId = localStorage.getItem('roleId');
    useEffect(() => {
      dispatch(getAllRecommendedProducts());
    }, [dispatch]);

  const { data } = useSelector((state: RootState) => state.recommended);

  let renderedProducts;
  if (!data) {
    renderedProducts = <p>Loading...</p>;
  } else if (data.length === 0) {
    renderedProducts = <p>No products found.</p>;
  } else {
    renderedProducts = data.slice(0, 3).map((product: Product) => (
      <div className="lg:h-[50vh] ll:h-[60vh] w-full h-[50vh]" key={product.id}>
        <div className="bg-[#F5F6F6] h-[60%] w-full rounded-lg flex items-center justify-center overflow-hidden hover:bg-green-700">
          {product.image && product.image[0] ? <img src={product.image[0]} alt="" className="w-full h-full mt-6 object-cover object-top hover:w-screen" /> : <FontAwesomeIcon icon={faImage} />}
        </div>
        <div className="h-[50%] mt-4">
          <div className="flex w-full justify-between font-medium">
            <p>{product.name}</p>
            <p>${product.price}</p>
          </div>
          <p className="text-sm text-left mt-2 text-[#C6C4C4]">{product.description}</p>
          <div className="flex mt-4 justify-between items-center">
            <button className="border-[1px] border-[#003D29] px-4 py-1 shadow-md rounded-3xl">Add to cart</button>
            <div className="border-[1px] border-[#003D29] rounded-3xl shadow-md">
              <FontAwesomeIcon icon={faHeartCirclePlus} className="text-[#003D29] text-xl p-1.5" />
            </div>
          </div>
        </div>
      </div>
    ));
  }
  return (
    <>
      <div>
        {roleId && parseInt(roleId) === 3 ? (
          <div className="mx-8 my-4 p-5 flex flex-col">
            <p className="font-bold text-xl py-5">Recommended Products</p>
            <div className="flex flex-col">
              <div className="mr-5 flex justify-end">
                <Link to="/products/recommended">
                  <Button label="Get More" style="bg-[#003D29] flex justify-end hover:text-green-300 text-white hero-bg-md:px-10 hero-bg-md:w-fit w-[100%] py-2 px-2 rounded-3xl sm:w-[100%] sm:px-2" />
                </Link>
              </div>
            </div>
            <div className="flex flex-col md:grid md:grid-cols-2 md:gap-7 px-5 pt-5 pb-0 lg:grid-cols-3">{renderedProducts}</div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default RecommendProducts;
