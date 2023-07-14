import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '../redux/hooks/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { ViewProduct } from '../redux/action/ProductAction';
import { updateProduct } from '../redux/action/ProductAction';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
type ImageData = {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category_id: number;
  stock: 'In Stock' | 'Out of Stock' | 'Expired' | any;
};
const UpdatePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const UpdateProductState = useSelector((state: RootState) => state.viewProduct) || {
    name: '',
    description: '',
    price: 0,
    category_id: 0,
    stock: ':',
    quantity: 0,
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(ViewProduct({ id }));
  }, [dispatch, id]);
  const productData = UpdateProductState.state.data;
  const [formData, setFormData] = useState<ImageData>({
    name: productData?.name || '',
    description: productData?.description || '',
    price: productData?.price || 0,
    category_id: productData?.category_id || 0,
    stock: productData?.stock || ':',
    quantity: productData?.quantity || 0,
  });
  const [galleryImages, setGalleryImages] = useState(productData?.image || []);
  const [deletedImages, setDeletedImages] = useState<any>('');
  const [AddedImages, setAddedImages] = useState<File[]>([]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleImage = (event: any) => {
    const files = event.target.files[0];
    setGalleryImages([...galleryImages, files]);
    console.log(files);
    if(files){
      setAddedImages([...AddedImages, files]);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, description, price, quantity, stock, category_id } = formData;
    const data: any = {
      name,
      description,
      price,
      quantity,
      stock,
      category_id,
      deletedImages,
    };
     const imageData = new FormData();
        if(AddedImages.length > 0) {
          AddedImages.forEach((file) => {
            imageData.append('image', file, file.name);
          });
        }
        for (let key in data) {
          if(data.hasOwnProperty(key)){
            imageData.append(key,  data[key]);
          }
        }
    try {
      await dispatch(updateProduct({ id, data: imageData }));
      console.log('data 4', data);
    } catch (error: any) {
      if (error.response & error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred while updating');
      }
    } finally {
      toast.success('Updated successfully', {
        onClose: () => {
          navigate(`/product/${productData.id}`);
        },
      });
    }
  };
    const handleImagePreview = (imageUrl: string) => {
      console.log(`Previewing image: ${imageUrl}`);
    };
    const handleImageUpdate = (imageUrl: string | undefined) => {
      // Handle image update logic
      console.log(`Updating image: ${imageUrl}`);
    };
    const handleImageDelete = (imageUrl: any) => {
      setGalleryImages((prevImages: any[]) => prevImages.filter((image: string | undefined) => image !== imageUrl));
      if(productData.image.includes(imageUrl)){
        setDeletedImages(
          [...deletedImages, imageUrl]
        );
      }
      console.log(deletedImages);
    };
  return (
    <div className="flex flex-col bg-white-90 border rounded mx-auto my-10 p-4 max-w-md">
      <h2 className="text-2xl mb-4">Update Product</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-gray-500 block">Product Name:</label>
          <input type="text" name="name" className="rounded bg-gray-200 border border-gray-300 px-2 py-1 w-full" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label className="text-gray-500 block">Description:</label>
          <input type="text" name="description" className="rounded bg-gray-200 border border-gray-300 px-2 py-1 w-full" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label className="text-gray-500 block">Price:</label>
          <input type="number" name="price" className="rounded bg-gray-200 border border-gray-300 px-2 py-1 w-full" value={formData.price} onChange={handleChange} />
        </div>
        <div>
          <label className="text-gray-500 block">Category ID:</label>
          <input type="number" name="category_id" className="rounded bg-gray-200 border border-gray-300 px-2 py-1 w-full" value={formData.category_id} onChange={handleChange} />
        </div>
        <div>
          <div>
            <label className="text-gray-500 block">Product Picture:</label>
            {galleryImages &&(
               <div className="image-gallery , bg-blue-100 grid grid-cols-4">
               {galleryImages.map((imageUrl: any, index: React.Key | null | undefined) => (
                 <div key={index} className="image-item border border-gray-500 p-1 ">
                   {typeof imageUrl === 'string' ? (
                    <img src={imageUrl} alt={`Image ${index}`} className="w-20 h-20" />
                   ):(
                    <img src={URL.createObjectURL(imageUrl)} alt={`Image ${index}`} className="w-20 h-20" />
                   )}
                   <div className="image-buttons grid grid-cols-3 gap-1/2 align-middle">
                     <button onClick={() => handleImagePreview(imageUrl)}>
                       <FontAwesomeIcon icon={faEye} />
                     </button>
                     <button onClick={() => handleImageUpdate(imageUrl)}>
                       <FontAwesomeIcon icon={faEdit} />
                     </button>
                     <button onClick={() => handleImageDelete(imageUrl)}>
                       <FontAwesomeIcon icon={faTrash} />
                     </button>
                   </div>
                 </div>
               ))}
             </div>
            )}
            <label className="file-input-label">
              <input type="file" name="image" className="hidden" onChange={handleImage} accept="image/*"/>
              <span className="inline-block p-2 bg-blue-500 border-1 rounded my-1">Upload Image</span>
            </label>
          </div>
        </div>
        <div>
          <label className="text-gray-500 block">Stock:</label>
          <select name="stocks" className="rounded bg-gray-200 border border-gray-300 px-2 py-1 w-full" value={formData.stock} onChange={handleChange}>
            <option value="">Select stock</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
        <div>
          <label className="text-gray-500 block">Quantity:</label>
          <input type="number" name="quantity" className="rounded bg-gray-200 border border-gray-300 px-2 py-1 w-full" value={formData.quantity} onChange={handleChange} />
        </div>
        <button type="submit" className="mx-auto block bg-blue-500 text-white px-4 py-2 rounded">
          Update Product
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};
export default UpdatePage;