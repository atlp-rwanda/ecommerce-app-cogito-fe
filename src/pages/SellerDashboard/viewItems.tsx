import Sidebar from '@/components/SellerSidebar/sellerSidebar';
import Header from '@/components/SellerDashHeader/sellerHeader';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { fetchProducts } from '../../redux/action/fetchProductAction';
import { productRemove } from '../../redux/action/fetchProductAction';
import ProductModal from '../../components/productViewModal/productModal';

const ViewItems: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.Allproducts.state);
  console.log(data);
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [productDelete, setProductDelete] = useState({ productId: 0, name: '' });
  const [isDelete, setIsdelete] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const roleId = localStorage.getItem('roleId');
    if (roleId) {
      if (parseInt(roleId) != 2) {
        navigate('/');
      }
    } else {
      navigate('/login');
    }
  }, []);
  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [, setCurrentPhotoIndex] = useState<number>(0);
  const [searchResult, setSearchResult] = useState([]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = data.slice(startIndex, endIndex);

  function handleDelete(): void {
    const { productId } = productDelete;

    dispatch(productRemove(productId) as any).then(({ payload }: any) => {
      if (payload === 200) {
        dispatch(fetchProducts() as any);
        setProductDelete({ productId: 0, name: '' });
        setIsdelete(false);
      }
    });
  }

  function handleView(_id: string): void {
    setCurrentProductId(_id);
    setCurrentPhotoIndex(0);
  }
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleSearch = (e: any) => {
    const value = e.target.value;
    setSearchResult(data.filter((product: { name: string }) => product.name.toLowerCase().includes(value.toLowerCase())));
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
    <>
      <div className="w-1/3">
        <Sidebar />
      </div>
      <Header />
      <label className="relative block">
        <span className="sr-only">Search</span>

        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-48 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Search for product..."
          type="text"
          name="search"
        />
      </label>
      <div className="w-2/3 ml-96 ">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-4 mt-4">In Stock Products</h1>
          <input className="border border-slate-300 h-10 rounded pl-2" type="text" placeholder="Search product" onChange={(e) => handleSearch(e)} />
        </div>

        <div className="flex flex-col custom-md:grid custom-md:grid-cols-2 custom-md:gap-5 md:gap-7 lg:grid-cols-3">
          {searchResult.length != 0
            ? searchResult.map((product: any) => (
                <div key={product.id} className="border border-slate-100 bg-white rounded-lg shadow-md p-4 mb-4h-[70vh] w-full mt-6">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <img src={product.image[0]} alt={product.name} className="w-1/2 mb-2 " />
                  <p className="font-semibold mb-1">Price: {product.price}</p>
                  <p className="font-semibold mb-1">Quantity: {product.quantity}</p>
                  <div className="flex justify-between">
                    <button type="button" data-modal-target="popup-modal" data-modal-toggle="popup-modal" className="bg-red-500 text-white font-semibold rounded px-4 py-2" onClick={() => handleDelete()}>
                      Delete
                    </button>
                    <button className="bg-green-700 text-white font-semibold rounded px-4 py-2" onClick={() => handleView(product.id)}>
                      View
                    </button>
                  </div>
                </div>
              ))
            : currentProducts.map((product: any) => (
                <div key={product.id} className="border border-slate-100 bg-white rounded-lg shadow-md p-4 mb-4h-[70vh] w-full mt-6">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  <img src={product.image[0]} alt={product.name} className="w-1/2 mb-2 " />
                  <p className="font-semibold mb-1">Price: {product.price}</p>
                  <p className="font-semibold mb-1">Quantity: {product.quantity}</p>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      data-modal-target="popup-modal"
                      data-modal-toggle="popup-modal"
                      className="bg-red-500 text-white font-semibold rounded px-4 py-2"
                      onClick={() => {
                        setProductDelete({ productId: product.id, name: product.name });
                        setIsdelete(true);
                      }}
                    >
                      Delete
                    </button>
                    <button className="bg-green-700 text-white font-semibold rounded px-4 py-2" onClick={() => handleView(product.id)}>
                      View
                    </button>
                  </div>
                </div>
              ))}
        </div>

        <div className="flex justify-center">
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
        </div>
      </div>
      {currentProductId && <ProductModal productId={currentProductId} onClose={() => setCurrentProductId(null)} />}
      {isDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white w-1/3 rounded-lg shadow-lg">
            <div className="p-4">
              <h2 className="text-xl text-red-500 font-semibold mb-5">Warning!</h2>
              <p>Are you sure you want to delete {productDelete.name} product?</p>
            </div>
            <div className="flex justify-between p-4">
              <button className="border border-gray-400 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded" onClick={() => setIsdelete(false)}>
                Close
              </button>
              <button className="bg-red-500 text-white font-semibold rounded px-4 py-2" onClick={() => handleDelete()}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewItems;
