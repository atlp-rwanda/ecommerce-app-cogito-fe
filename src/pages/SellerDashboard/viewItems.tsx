import Sidebar from '../../components/SellerSidebar/sellerSidebar';
import AddProductForm from '../../components/productForm/productForm';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import { fetchProducts } from '../../redux/action/fetchProductAction';
import { productRemove } from '../../redux/action/fetchProductAction';
import ProductModal from '../../components/productViewModal/productModal';
import moment from 'moment';
import { faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ViewItems: React.FC = () => {
  interface ProductToDelete {
    productId: number;
    name: string;
  }
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.Allproducts.state);
  console.log(data);
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const initialStateProductToDelete: ProductToDelete = { productId: 0, name: '' };
  const [productDelete, setProductDelete] = useState<ProductToDelete>(initialStateProductToDelete);
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
    if (productId != 0) {
      dispatch(productRemove(productId) as any).then(({ payload }: any) => {
        if (payload === 200) {
          dispatch(fetchProducts() as any);
          setProductDelete({ productId: 0, name: '' });
          setIsdelete(false);
        }
      });
    }
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
  const [visible, showForm] = useState(false);
  const handleClose = () => showForm(false);
  return (
    <>
      <div className="h-screen">
        <div className="flex h-screen">
          <div className="w-1/6">
            <Sidebar />
          </div>
          <div className="w-5/6 px-10 mt-10">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold mb-4 mt-0 text-green-700">In Stock Products</h1>
              <button onClick={() => showForm(true)} className="p-2 text-sm w-full md:w-64 shadow-lg bg-green-700 text-slate-50 hover:bg-green-900">
                ADD NEW PRODUCT
              </button>
            </div>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-md">List of all products in your collection</h1>
              <input className="border border-slate-300 h-10 w-full md:w-64 rounded pl-2" type="text" placeholder="Search product" onChange={(e) => handleSearch(e)} />
            </div>
            <div className="w-full pb-2 overflow-x-auto bg-white">
              <table className="font-light w-full">
                <thead className="bg-green-200">
                  <tr>
                    <th className="w-[2%] sm:w-5 text-start font-semibold px-3 py-4">ID</th>
                    <th className="w-[20%] sm:w-32 text-start font-semibold px-3 py-4">Name</th>
                    <th className="w-[40%] sm:w-64 text-start font-semibold px-3 py-4">Description</th>
                    <th className="w-[16%] sm:w-20 text-start font-semibold px-3 py-4">Price</th>
                    <th className="w-[20%] sm:w-24 text-start font-semibold px-3 py-4">Stock</th>
                    <th className="w-[20%] sm:w-24 text-start font-semibold px-3 py-4">Category ID</th>
                    <th className="w-[16%] sm:w-20 text-start font-semibold px-3 py-4">Quantity</th>
                    <th className="w-[20%] sm:w-32 text-start font-semibold px-3 py-4">Expiration Date</th>
                    <th className="w-[20%] sm:w-32 text-start font-semibold px-3 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResult.length != 0
                    ? searchResult.map((product: any) => (
                        <>
                          <tr key={product.id} className="border-b-2 border-green-200">
                            <td className="w-[2%] sm:w-5 text-start px-3 py-1">{product.id}</td>
                            <td className="w-[20%] sm:w-24 text-start px-3 py-1">{product.name}</td>
                            <td className="w-[40%] sm:w-64 text-start px-3 py-1">{product.description}</td>
                            <td className="w-[16%] sm:w-20 text-start px-3 py-1">{product.price}</td>
                            <td className="w-[20%] sm:w-24 text-start px-3 py-1">{product.stock}</td>
                            <td className="w-[20%] sm:w-24 text-start px-3 py-1">{product.category_id}</td>
                            <td className="w-[16%] sm:w-32 text-start px-3 py-1">{product.quantity}</td>
                            <td className="w-[20%] sm:w-32 text-start px-3 py-1">{moment(product.expiredAt).format('MMM D,YYYY')}</td>
                            <td className="w-[20%] sm:w-32 text-start px-6 py-3">
                              <div className="flex justify-start">
                                <button className="bg-green-700 text-white font-semibold rounded px-1 py-1 mr-2" onClick={() => handleView(product.id)}>
                                  <FontAwesomeIcon icon={faEye} className="" />
                                </button>
                                <button
                                  type="button"
                                  data-modal-target="popup-modal"
                                  data-modal-toggle="popup-modal"
                                  className="bg-red-500 text-white font-semibold rounded px-1 py-1"
                                  // onClick={() => handleDelete()}
                                  onClick={() => {
                                    setProductDelete({ productId: product.id, name: product.name });
                                    setIsdelete(true);
                                  }}
                                >
                                  <FontAwesomeIcon icon={faTrashAlt} className="" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        </>
                      ))
                    : currentProducts.map((product: any) => (
                        <tr key={product.id} className="border-b-2 border-green-200">
                          <td className="w-[2%] sm:w-5 text-start px-3 py-1">{product.id}</td>
                          <td className="w-[20%] sm:w-24 text-start px-3 py-1">{product.name}</td>
                          <td className="w-[40%] sm:w-64 text-start px-3 py-1">{product.description}</td>
                          <td className="w-[16%] sm:w-20 text-start px-3 py-1">{product.price}</td>
                          <td className="w-[20%] sm:w-24 text-start px-3 py-1">{product.stock}</td>
                          <td className="w-[20%] sm:w-24 text-start px-3 py-1">{product.category_id}</td>
                          <td className="w-[16%] sm:w-32 text-start px-3 py-1">{product.quantity}</td>
                          <td className="w-[20%] sm:w-32 text-start px-3 py-1">{moment(product.expiredAt).format('MMM D,YYYY')}</td>
                          <td className="w-[20%] sm:w-32 text-start px-6 py-3">
                            <div className="flex justify-start">
                              <button className="bg-green-700 text-white font-semibold rounded px-1 py-1 mr-2" onClick={() => handleView(product.id)}>
                                <FontAwesomeIcon icon={faEye} className="" />
                              </button>
                              <button
                                type="button"
                                data-modal-target="popup-modal"
                                data-modal-toggle="popup-modal"
                                className="bg-red-500 text-white font-semibold rounded px-1 py-1"
                                onClick={() => {
                                  setProductDelete({ productId: product.id, name: product.name });
                                  setIsdelete(true);
                                }}
                              >
                                <FontAwesomeIcon icon={faTrashAlt} className="" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
              <AddProductForm onClose={handleClose} visible={visible} />
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
            {currentProductId && <ProductModal productId={currentProductId} onClose={() => setCurrentProductId(null)} />}
            {isDelete && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="relative bg-white w-1/3 rounded-lg shadow-lg">
                  <div className="p-4">
                    <h2 className="text-xl text-red-500 font-semibold mb-5">Warning!</h2>
                    <p>Are you sure you want to delete this product?</p>
                    <p><span className='font-semibold'>Product ID: </span>{productDelete.productId}, </p>
                    <p><span className='font-semibold'>Product Name: </span>{productDelete.name} </p>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewItems;
