import React, { useState } from "react";
import { useAppDispatch } from '../redux/hooks/hooks';
import { updateProduct } from '../redux/action/UpdateAction';

const UpdatePage: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [quantity, setQuantity] = useState('');
  const [stocks, setStocks] = useState('');
  const [category_id, setCategory_id] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dispatch the updateProduct action here with the form data
    dispatch(updateProduct({
      name,
      description,
      price: Number(price),
      image,
      quantity: Number(quantity),
      stocks,
      category_id: Number(category_id)
    }));

    // Reset the form fields
    setName('');
    setDescription('');
    setPrice('');
    setImage('');
    setQuantity('');
    setStocks('');
    setCategory_id('');
  };
  return (
    <div className="flex flex-col bg-white-90 border rounded mx-48 my-10 p-4">
      <h2 className="text-2xl mb-4">Update Product.</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-gray-500 block"> Product Name</label>
          <input type="text" name="name" className="rounded bg-gray-200 border border-gray-300 px-2 py-1 w-full" required />
        </div>
        <div>
          <label className="text-gray-500 block">Description:</label>
          <input type="text" name="name" className="rounded bg-gray-200 border border-gray-300 px-2 py-1 w-full" required />
        </div>
        
        <div>
          <label className="text-gray-500 block">Price</label>
          <input type="number" name="quantity" className="rounded bg-gray-200 border border-gray-300 px-2 py-1 w-full" required />
        </div>
        <div>
          <label className="text-gray-500 block">category_id</label>
          <input type="number" name="quantity" className="rounded bg-gray-200 border border-gray-300 px-2 py-1 w-full" required />
        </div>
        <div>
          <label className="text-gray-500 block">Product Picture</label>
          <input type="file" name="name" className="rounded bg-gray-200 border-gray-300 px-2 py-1 w-full" required />
        </div>
        <div>
  <label className="text-gray-500 block">Stock</label>
  <select name="stock" className="rounded bg-gray-200 border border-gray-300 px-2 py-1 w-full" required>
    <option value="In Stock">In Stock</option>
    <option value="Out of Stock">Out of Stock</option>
  </select>
</div>

        <div>
          <label className="text-gray-500 block">Quantity:</label>
          <input type="number" name="price" className="rounded bg-gray-200 border border-gray-300 px-2 py-1 w-full" required />
        </div>
        <button type="submit" className="mx-auto block bg-blue-500 text-white px-4 py-2 rounded">
  Update Product
</button>

      </form>
    </div>
  );
};

export default UpdatePage;

