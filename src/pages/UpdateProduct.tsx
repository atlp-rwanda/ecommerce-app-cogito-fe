import { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateProduct, getProductById } from '../redux/action/UpdateAction';
import { Link, useParams } from 'react-router-dom';

export default function UpdateProduct() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const product = useSelector((state: any) => state.getProductById.data);
  const [uname, setName] = useState<string | undefined>(product?.data?.item.name);
  const [udescription, setDescription] = useState<string | undefined>(product?.data?.item.description);
  const [uprice, setPrice] = useState<number | undefined>(product?.data?.item.price);
  const [uimage, setImage] = useState<string[]>([product?.data?.item.image]);
  const [uquantity, setQuantity] = useState<number | undefined>(product?.data?.item.quantity);
  const [ustock, setStock] = useState<string | undefined>(product?.data?.item.stock);
  const [ucategory_id, setCategory_id] = useState<string | undefined>(product?.data?.item.category_id);

  const productData = {
    id: id,
    name: uname || '',
    description: udescription || '',
    price: uprice || 0,
    image: uimage,
    quantity: uquantity || 0,
    stock: ustock || '',
    category_id: ucategory_id || '',
  };

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const urls = e.target.value.split(','); // Split the value using a delimiter (e.g., comma)
    setImage(urls);
  };

  const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPrice(value);
  };

  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(value);
  };

  const handleStock = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setStock(value);
  };

  const handleCategory_id = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategory_id(value);
  };

  useEffect(() => {
    dispatch(getProductById(id as any) as any).then((res: any) => {
      setName(res?.payload?.data?.item?.name);
      setDescription(res?.payload?.data?.item?.description);
      setPrice(res?.payload?.data?.item?.price);
      setImage(res?.payload?.data?.item?.picture_urls);
      setQuantity(res?.payload?.data?.item?.available);
      setStock(res?.payload?.data?.item?.instock);
      setCategory_id(res?.payload?.data?.item?.expiryDate.slice(0, 10));
    });
  }, [dispatch, id]);

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      await dispatch(updateProduct(productData as any) as any);
      toast.success('Updated successfully');
      setLoading(true);

      setName('');
      setDescription('');
      setPrice(0);
      setImage([]);
      setQuantity(0);
      setStock('');
      setCategory_id('');

      window.location.replace('/vendor');
    } catch (error) {
      console.log(error);
      toast.error('Error updating');
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <div id="container_form" className="w-5/6 flex justify-center m-20 items-center">
          <form className="flex flex-col shadow-custom p-9 rounded-xl">
            <div className="flex justify-between w-full p-2">
              <h3 className="mx-auto">Update product</h3>
              <div>
                <Link
                  to="/vendor"
                  className="flex items-center justify-center shadow-sm ring-1 ring-inset ring-gray-300 rounded-full w-6 h-6"
                >
                  <i id="cancel_btn" className="material-symbols-rounded">
                    close
                  </i>
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                type="text"
                value={uname}
                onChange={handleName}
                placeholder="Product Name"
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="mt-2 ">
              <textarea
                value={udescription}
                onChange={handleDescription}
                placeholder="Product description"
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="mt-2">
                <input
                  type="text"
                  value={uprice}
                  onChange={handlePrice}
                  placeholder="Price"
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="mt-2">
              <input
                type="url"
                value={uimage}
                onChange={handleImage}
                placeholder="Image Urls"
                className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
              <div className="mt-2">
                <input
                  type="number"
                  value={uquantity}
                  onChange={handleQuantity}
                  placeholder="Quantity"
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="mt-2">
                <select
                  value={ustock}
                  onChange={handleStock}
                  className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Select Stock</option>
                  <option value="in stock">In Stock</option>
                  <option value="out of stock">Out of Stock</option>
                </select>
              </div>
            </div>
            <div className="mt-2">
              <input
                type="text"
                value={ucategory_id}
                onChange={handleCategory_id}
                placeholder="Category ID"
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <Link
              to={`/vendor`}
              type="submit"
              onClick={handleSubmit}
              className="flex items-center justify-center  text-white  bg-customBlue  rounded mt-3 py-2 w-21"
            >
              <span className="mr-2 uppercase">
                {isLoading ? 'Loading ...' : 'UPDATE'}
              </span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
