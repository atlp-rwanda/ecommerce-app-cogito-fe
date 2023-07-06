import { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addProduct } from '../../redux/action/AddAction';

export const AddProductForm = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const dispatch = useDispatch();
  const [uname, setName] = useState('');
  const [udescription, setDescription] = useState('');
  const [uimage, setImage] = useState<File[]>([]);
  const [uprice, setPrice] = useState<number>(0);
  const [uquantity, setQuantity] = useState<number>(0);
  const [ucategory_id, setCategory_id] = useState<number>(0);
  const [ustock, setStock] = useState('');
  const [uexpiredAt, setExpiredAt] = useState<number>(0);
  const [isLoading, setLoading] = useState(false);
  const productData = {
    name: uname,
    description: udescription,
    price: uprice,
    image: uimage,
    quantity: uquantity,
    stock: ustock,
    category_id: ucategory_id,
    expiredAt: uexpiredAt,
  };
  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImage((prevFiles) => [...prevFiles, ...Array.from(files)]);
      // Display selected file names
      Array.from(files).forEach((file) => {
        console.log(file.name);
      });
    }
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
    const value = parseInt(e.target.value, 10);
    setCategory_id(value);
  };
  const handleExpiredAt = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setExpiredAt(value);
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    if (uimage.length > 0) {
      uimage.forEach((file) => {
        formData.append('image', file, file.name);
      });
    }
    for (const key in productData) {
      const value = productData[key as keyof typeof productData];
      if (typeof value === 'string' || typeof value === 'number') {
        formData.append(key, String(value));
      } else if (value instanceof File) {
        formData.append(key, value);
      }
    }
    console.log(formData);
    try {
      setLoading(true);
      await dispatch(addProduct({ productData: formData, setLoading }) as any);
      setLoading(false);
      onClose();
      toast.success('Product added successfully');

      setName('');
      setDescription('');
      setPrice(0);
      setImage([]);
      setQuantity(0);
      setStock('');
      setCategory_id(0);
      setExpiredAt(0);
      if (uname.trim() === '') {
        toast.error('Please enter Product Name.');
        setLoading(false);
        return;
      }
      if (udescription.trim() === '') {
        toast.error('Please enter a Product Description.');
        setLoading(false);
        return;
      }
      if (Number(uprice) === 0) {
        toast.error('Please enter Product Price.');
        setLoading(false);
        return;
      }
      if (Number(ucategory_id) === 0) {
        toast.error('Please enter Product Category.');
        setLoading(false);
        return;
      }
      if (uimage === null) {
        toast.error('Please enter Product Images.');
        setLoading(false);
        return;
      }
      if (uexpiredAt === null) {
        toast.error('Please enter Product Expiry Date.');
        setLoading(false);
        return;
      }
      if (Number(uquantity) === 0) {
        toast.error('Please enter quantity.');
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error('Error adding product');
      setLoading(false);
    }
  };
  const handleOnClose = (event: React.MouseEvent<HTMLDivElement>) => {
    const { id } = event.target as HTMLDivElement;
    if (id === 'container_form' || id === 'cancel_btn') onClose();
  };
  if (!visible) return null;
  return (
    <div id="container_form" onClick={handleOnClose} className="container_form bg-black/30  w-full fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="add_product_form bg-white max-w-lg h-full px-10 py-5 rounded-xl m-2">
        <div className="form__header flex flex-col">
          <i onClick={handleOnClose} id="cancel_btn" className="cancel_btn cursor-pointer material-symbols-rounded self-end mt-5">
            Cancel
          </i>
          <p className="title font-bold text-center text-blue-400 mb-8 text-xl md:text-2xl lg:text-3xl xl:text-4xl">Add Product</p>
        </div>
        <form className="flex flex-col gap-5 font-light" encType="multipart/form-data">
          <input
            className="focus:outline-none bg-blue-50  h-10 border border-black/10 rounded-lg outline-0 placeholder:font-light placeholder:text-gray-600/80 p-2 pl-4"
            type="text"
            onChange={handleName}
            // {...register('name')}
            placeholder="Product Name"
            name="name"
            id=""
          />
          <textarea
            className="focus:outline-none bg-blue-50  h-10 border border-black/10 rounded-lg outline-0 placeholder:font-light placeholder:text-gray-600/80 p-2 pl-4"
            onChange={handleDescription}
            // {...register('description')}
            placeholder="Product Description"
            name="description"
            id=""
          />
          <input
            className="focus:outline-none bg-blue-50  h-10 border border-black/10 rounded-lg outline-0 placeholder:font-light placeholder:text-gray-600/80 p-2 pl-4"
            type="file"
            multiple={true}
            // onchange="displaySelectedFiles(event)"
            accept="image/*"
            onChange={handleImage}
            placeholder="Product Image"
            name="image_link"
            id="image files"
          />
          <div className="flex justify-between flex-wrap gap-5">
            <input
              className="focus:outline-none bg-blue-50 h-10 border border-black/10 rounded-lg outline-0 placeholder:font-light placeholder:text-gray-600/80 p-2 pl-4"
              type="number"
              onChange={handlePrice}
              //   {...register('price')}
              placeholder="Product Price"
              name="price"
              id=""
            />
            <input
              className="focus:outline-none bg-blue-50 h-10 border border-black/10 rounded-lg outline-0 placeholder:font-light placeholder:text-gray-600/80 p-2 pl-4"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStock(e as any)}
              placeholder="In stock"
              name="In Stock"
              id=""
            />
          </div>
          <input
            className="focus:outline-none bg-blue-50 h-10 border border-black/10 rounded-lg outline-0 placeholder:font-light placeholder:text-gray-600/80 p-2 pl-4"
            type="number"
            onChange={handleCategory_id}
            // {...register('Category_id')}
            placeholder=" Category_id"
            name="category"
            id=""
          />
          <input
            className="focus:outline-none bg-blue-50 h-10 border border-black/10 rounded-lg outline-0 placeholder:font-light placeholder:text-gray-600/80 p-2 pl-4"
            type="number"
            onChange={handleQuantity}
            // {...register('quantity')}
            placeholder="Quantity"
            name="quantity"
            id=""
          />
          <input
            className="focus:outline-none bg-blue-50 h-10 border border-black/10 rounded-lg outline-0 placeholder:font-light placeholder:text-gray-600/80 p-2 pl-4"
            type="date"
            onChange={handleExpiredAt}
            // {...register('expiredAt')}
            placeholder="ExpiredAt"
            name="ExpiredAt"
            id=""
          />
          <button type="button" onClick={handleSubmit} className="text-white bg-cyan-700 w-32 py-2 px-2 rounded font-extralight self-center">
            <span className="mr-2 uppercase">{isLoading ? 'Loading ...' : 'Save'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddProductForm;
