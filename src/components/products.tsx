import { getAllProducts } from '@/redux/action/products';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { RootState } from '@/redux/store/store';
import { faFilter, faHeartCirclePlus, faArrowsUpDown, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Products = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  const { products } = useSelector((state: RootState) => state.allProducts);
  console.log(products);
  return (
    <div className="text-center flex flex-col items-center w-[80%] m-auto lm:w-[70%] md:w-[80%] lg:w-[90%]">
      <p className="m-auto text-2xl font-bold mt-6">Explore Products</p>
      <div className="flex justify-between mt-8 w-full md:justify-end">
        <div className="flex items-center justify-center border-[1px] border-[#9C9EBA] py-1 w-[49%] rounded-md md:w-fit md:px-6 md:mr-2">
          <p className="pr-2">Filter</p>
          <FontAwesomeIcon icon={faFilter} className="" />
        </div>
        <div className="flex items-center justify-center border-[1px] border-[#9C9EBA] py-1 w-[49%] rounded-md md:w-fit md:px-6">
          <p className="pr-2">Sort</p>
          <FontAwesomeIcon icon={faArrowsUpDown} className="" />
        </div>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-2 md:gap-7 lg:grid-cols-3">
        {products.items.map((product) => {
          return (
            <div className="h-[70vh] lg:h-[50vh] ll:h-[60vh] w-full mt-6">
              <div className="bg-[#F5F6F6] h-[60%] w-full rounded-lg flex items-center justify-center overflow-hidden ">
                {product.image[0]?(
                    <img src={product.image[0]} alt="" className="w-[100%] mt-6 object-cover object-top" />
                ):(
                    <FontAwesomeIcon icon={faImage}/>
                )}
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
          );
        })}
      </div>
    </div>
  );
};

export default Products;
