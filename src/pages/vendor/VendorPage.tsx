import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/sidebar';
import { useSelector } from 'react-redux';
import AddProductForm from '../../components/productForm/productForm';
import Header from '../../components/Header/header';
import { RootState } from '../../redux/store/store';
import { fetchProducts } from '../../redux/action/ProductAction';
import { useAppDispatch } from '../../redux/hooks/hooks';
interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: string;
  category_id: number;
  quantity: number;
  expiredAt: string;
}
export default function VendorPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  const allProductstate = useSelector((state: RootState) => state.Allproducts.state);
  console.log('My Data Here::::::');
  console.log(allProductstate.data);
  const tableData: Item[] = Array.isArray(allProductstate.data) ? allProductstate.data : [];
  // const tableData = data.slice(indexOfFirstProduct, indexOfLastProduct);

  const [visible, showForm] = useState(false);
  const handleClose = () => showForm(false);

  return (
    <div className="products">
      <Header />
      <Sidebar />
      <div className="  md:ml-52">
        <div className=" pt-10 flex flex-col items-center lg:mx-20">
          <div className="dashboard flex flex-col gap-8 flex-wrap w-full md:w-[90%]">
            <button onClick={() => showForm(true)} className="p-2 text-sm w-full md:w-64 shadow-lg bg-cyan-700 text-slate-50 hover:bg-cyan-500">
              ADD NEW PRODUCT
            </button>
            <label className="relative block">
              <span className="sr-only">Search</span>
              <input
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full md:w-48 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="Search for product..."
                type="text"
                name="search"
              />
            </label>
            <div className="space-y-4">
              <div className="text-xl font-bold text-cyan-700">Recent Products</div>
            </div>
          </div>
          <AddProductForm onClose={handleClose} visible={visible} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full md:w-80 pl-4 md:pl-20 text-sm ml-4 md:ml-20 text-gray-500">
            <thead className="text-xs text-gray-700 uppercase border-b border-cyan-700">
              <tr>
                <th scope="col" className="px-6 py-3 bg-gray-50">
                  Product ID
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50">
                  Category ID
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50">
                  Expiry Date
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50"></th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.stock}</td>
                  <td>{item.category_id}</td>
                  <td>{item.quantity}</td>
                  <td>{item.expiredAt}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
