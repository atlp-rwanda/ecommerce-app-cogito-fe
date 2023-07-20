import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ProductModalProps {
  productId: string;
  onClose: () => void;
}
const ProductModal: React.FC<ProductModalProps> = ({ productId, onClose }) => {
  const product = useSelector((state: RootState) => state.Allproducts.state.data.find((p: any) => p.id === productId));

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  if (!product) {
    return null;
  }

  const { name, description, image } = product;
  const handleClose = () => {
    onClose();
  };
  const handleNextImage = () => {
    if (currentPhotoIndex + 1 < image?.length) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white w-1/3 rounded-lg shadow-lg">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{name}</h2>
          <p>{description}</p>
          {image && image.length > 0 && <img src={image[currentPhotoIndex]} alt={name} />}
          <button onClick={() => handleNextImage()}>Next Photo</button>
        </div>
        <div className="flex justify-between p-4">
          <Link to={`/update-product/${product.id}`} type="button" className="h-fit px-6 py-2 font-semibold uppercase rounded-xl bg-green-900 hover:bg-white-500 text-white">
            update
          </Link>
          <button className="border border-gray-400 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded" onClick={() => handleClose()}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
