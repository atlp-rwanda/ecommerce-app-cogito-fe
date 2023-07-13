import { RootState } from '@/redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../redux/action/fetchProductAction';
import { useEffect, useState } from 'react'; // Add useEffect import

const ProductModal: React.FC<{ productId: string }> = ({ productId }) => {
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.Allproducts.data.find((p) => p.id === productId));

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    // Add useEffect hook to fetch product details
    dispatch(fetchProductById(productId) as any);
  }, [dispatch, productId]);

  return (
    <div className="modal">
      <h2>{product?.name}</h2>
      <p>{product?.description}</p>
      <img src={product?.image[currentPhotoIndex]} alt={product?.name} />
      <button onClick={() => setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % (product?.image.length || 0))}>Next Photo</button>
      <button onClick={() => setCurrentPhotoIndex(0)}>Close</button> {/* Reset photo index on close */}
    </div>
  );
};

export default ProductModal;
