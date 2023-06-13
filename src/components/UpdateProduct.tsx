import React, { useState,useEffect } from "react";
import { useAppDispatch } from '../redux/hooks/hooks';
import { updateProduct } from '../redux/action/UpdateAction';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';

type FormData = {
name:string,
description:string,
price:number|null,
image:File|null,
quantity:number|null,
stocks:string,
category_id:number|null,}

const UpdatePage: React.FC = () => {
  const initialFormData = {
    name: '',
    description: '',
    price:0,
    category_id:0,
    stocks: '',
    quantity: 0
  };
  const [formData, setFormData] = useState(initialFormData);
  const UpdateProductState = useSelector((state: RootState) => state.updateProduct);
  useEffect(() => {
    if (UpdateProductState.state === 'FULFILLED') {
      // Dispatch action succeeded, handle the logic here
      console.log('Product updated successfully!');
      console.log(UpdateProductState.data);
      setFormData(initialFormData);
    } else if (UpdateProductState.state === 'REJECTED') {
      console.log('updating password failed');
      // console.log('Error:', UpdateProductState.error);
    }
  }, [UpdateProductState.state, UpdateProductState.status, UpdateProductState.data, UpdateProductState.error]);

  const dispatch = useAppDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // }
  };
  const handleImage= (e:any)=>{const Image=e.target.files[0]; setFormData((prevState) => ({
    ...prevState,
    image: Image,
  }));}
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
  
  const data ={
    name:formData.name,
    description:formData.description,
    price:formData.price,
    quantity:formData.quantity,
    stock:formData.stocks,
    category_id:formData.category_id
  }
  const Dataform=new FormData()
  Dataform.append('image',formData.image);
  for ( var key in data) {
  Dataform.append(key, data[key]);
}
console.log(formData)
   await dispatch(updateProduct(Dataform));

  };
  return (
    <div className="flex flex-col bg-white-90 border rounded mx-auto my-10 p-4 max-w-md">
  <h2 className="text-2xl mb-4">Update Product</h2>
  <form className="space-y-4" onSubmit={handleSubmit}>
    <div>
      <label className="text-gray-500 block">Product Name:</label>
      <input
        type="text"
        name="name"
        className="rounded bg-gray-200 border border-gray-300 px-2 py-1 w-full"
        required
        value={formData.name}
        onChange={handleChange}
      />
    </div>
    <div>
      <label className="text-gray-500 block">Description:</label>
      <input
        type="text"
        name="description"
        className="rounded bg-gray-200 border border-gray-300 px-2 py-1 w-full"
        required
        value={formData.description}
        onChange={handleChange}
      />
    </div>
    <div>
      <label className="text-gray-500 block">Price:</label>
      <input
        type="number"
        name="price"
        className="rounded bg-gray-200 border border-gray-300 px-2 py-1 w-full"
        required
        value={formData.price}
        onChange={handleChange}
      />
    </div>
    <div>
      <label className="text-gray-500 block">Category ID:</label>
      <input
        type="number"
        name="category_id"
        className="rounded bg-gray-200 border border-gray-300 px-2 py-1 w-full"
        required
        value={formData.category_id}
        onChange={handleChange}
      />
    </div>
    <div>
      <label className="text-gray-500 block">Product Picture:</label>
      <input
        type="file"
        name="image"
        className="rounded bg-gray-200 border border-gray-300 px-2 py-1 w-full"
        onChange={handleImage}
      />
    </div>
    <div>
      <label className="text-gray-500 block">Stock:</label>
      <select
        name="stocks"
        className="rounded bg-gray-200 border border-gray-300 px-2 py-1 w-full"
        required
        value={formData.stocks}
        onChange={handleChange}
      >
        <option value="">Select stock</option>
        <option value="In Stock">In Stock</option>
        <option value="Out of Stock">Out of Stock</option>
      </select>
    </div>
    <div>
      <label className="text-gray-500 block">Quantity:</label>
      <input
        type="number"
        name="quantity"
        className="rounded bg-gray-200 border border-gray-300 px-2 py-1 w-full"
        required
        value={formData.quantity}
        onChange={handleChange}
      />
    </div>
    <button
      type="submit"
      className="mx-auto block bg-blue-500 text-white px-4 py-2 rounded"
    >
      Update Product
    </button>
  </form>
</div>

  );
};

export default UpdatePage;
