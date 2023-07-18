import { useEffect, useState } from 'react';
import Products from './products/products';
import { getAllProducts, getCategoryProducts } from '../redux/action/products';
import checkLoggedIn from '../utils/authorise';
import { useAppDispatch } from '../redux/hooks/hooks';
import { Params, useParams } from 'react-router-dom';

const Pagination = () => {
<<<<<<< HEAD
  const { categoryId, product }: Readonly<Params<string>> = useParams();
=======
  const { categoryId }: Readonly<Params<string>> = useParams();
>>>>>>> 8ff47cd (feat(wishlist): create the manage wishlist feature (#28))
  const itemsPerPage = 21;
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const isLoggedIn = checkLoggedIn();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
<<<<<<< HEAD
      if (categoryId) {
=======
      if(categoryId){
>>>>>>> 8ff47cd (feat(wishlist): create the manage wishlist feature (#28))
        const res = await dispatch(getCategoryProducts(Number(categoryId)));
        if (res.payload.status === 200) {
          setProducts(res.payload.data);
        }
<<<<<<< HEAD
      } else if (product) {
        const { payload } = await dispatch(getAllProducts());
        setProducts(payload.response.filter((result: any) => result.name.toLowerCase().includes(product.toLowerCase())));
      } else {
=======
      }else{
>>>>>>> 8ff47cd (feat(wishlist): create the manage wishlist feature (#28))
        const res = await dispatch(getAllProducts());
        if (res.payload.status === '200') {
          setProducts(res.payload.response);
        }
      }
    };
    getData();
<<<<<<< HEAD
  }, [categoryId, dispatch, isLoggedIn, product]);
=======
  }, [categoryId, dispatch, isLoggedIn]);
>>>>>>> 8ff47cd (feat(wishlist): create the manage wishlist feature (#28))

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const slicedData = products.slice(startIndex, endIndex);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderNumberButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button key={i} onClick={() => goToPage(i)} className={`${currentPage === i ? 'active bg-[#003D29] text-[#ffffff]' : 'bg-green-700 bg-opacity-20'} px-3 py-1 mr-2`}>
          {i}
        </button>,
      );
    }
    return buttons;
  };

  return (
    <div>
<<<<<<< HEAD
      <Products data={slicedData} />
      {totalPages > 1 && (
        <div className="w-[95%] m-auto flex justify-end mt-4">
          <button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)} className="text-sm font-semibold mr-3 text-[#003D29]">
            Previous
          </button>
          {renderNumberButtons()}
          <button disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)} className="text-sm font-semibold ml-1 text-[#003D29]">
            Next
          </button>
        </div>
      )}
=======
      <Products data={slicedData}/>
      {totalPages > 1&&(
      <div className="w-[95%] m-auto flex justify-end mt-4">
        <button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)} className="text-sm font-semibold mr-3 text-[#003D29]">
          Previous
        </button>
        {renderNumberButtons()}
        <button disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)} className="text-sm font-semibold ml-1 text-[#003D29]">
          Next
        </button>
      </div>)}
>>>>>>> 8ff47cd (feat(wishlist): create the manage wishlist feature (#28))
    </div>
  );
};

export default Pagination;
