import Sidebar from '@/components/SellerSidebar/sellerSidebar';
import Header from '@/components/SellerDashHeader/sellerHeader';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { fetchProducts } from '../../redux/action/fetchProductAction';
import { productRemove } from '../../redux/action/fetchProductAction';
import ProductModal from '../../components/productViewModal/productModal';

const ViewItems: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.Allproducts);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);

  // Calculate the indexes of the products to be displayed on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change the current page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  function handleDelete(productId: any): void {
    // Dispatch an action to remove the product from the Redux store
    dispatch(productRemove(productId) as any);
  }

  function handleView(_id: string): void {
    setCurrentProductId(_id);
    setCurrentPhotoIndex(0);
  }

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
        <h1 className="text-3xl font-bold mb-4 mt-4">In Stock Products</h1>
        {currentProducts.map((product: any) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4 mb-4 w-1/2 h-1/2">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <img src={product.image[0]} alt={product.name} className="w-1/2 mb-2 " />
            <p className="font-semibold mb-1">Price: {product.price}</p>
            <p className="font-semibold mb-1">Quantity: {product.quantity}</p>
            <div className="flex justify-between">
              <button className="bg-red-500 text-white font-semibold rounded px-4 py-2" onClick={() => handleDelete(product.id)}>
                Delete
              </button>
              <button className="bg-green-700 text-white font-semibold rounded px-4 py-2" onClick={() => handleView(product.id)}>
                View
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-center">
          {Array.from({ length: Math.ceil(data.length / productsPerPage) }).map((_, index) => (
            <button key={index} className="bg-green-700 text-white font-semibold rounded px-4 py-2 mx-1" onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      {/* Render the ProductModal component if currentProductId is not null */}
      {currentProductId && <ProductModal productId={currentProductId} onClose={() => setCurrentProductId(null)} />}
    </>
  );
};

export default ViewItems;
