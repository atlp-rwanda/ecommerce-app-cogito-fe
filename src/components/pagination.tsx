import { useEffect, useState } from 'react';
import Products from './products/products';
import { getAllProducts, getCategoryProducts } from '../redux/action/products';
import checkLoggedIn from '../utils/authorise';
import { useAppDispatch } from '../redux/hooks/hooks';
import { Params, useParams } from 'react-router-dom';

const Pagination = () => {
  const { categoryId }: Readonly<Params<string>> = useParams();
  const itemsPerPage = 21;
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const isLoggedIn = checkLoggedIn();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      if(categoryId){
        const res = await dispatch(getCategoryProducts(Number(categoryId)));
        if (res.payload.status === 200) {
          setProducts(res.payload.data);
        }
      }else{
        const res = await dispatch(getAllProducts());
        if (res.payload.status === '200') {
          setProducts(res.payload.response);
        }
      }
    };
    getData();
  }, [categoryId, dispatch, isLoggedIn]);

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
    </div>
  );
};

export default Pagination;
