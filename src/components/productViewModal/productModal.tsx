import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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

  const { name, description, image, id, price } = product;
  const handleClose = () => {
    onClose();
  };
  const handleNextImage = () => {
    if (currentPhotoIndex + 1 < image?.length) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };
  const handlePreviousImage = () => {
    if (currentPhotoIndex - 1 >= 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white w-1/3 rounded-lg shadow-lg h-[90%] my-2">
        <div className="p-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-2 basis-2/8">{name}</h2>
          <p className="basis-2/8"><span className='font-semibold'>Description: </span>{description}</p>
          <p className="basis-2/8"><span className='font-semibold'>Price: $</span>{price}</p>
          <div className="basis-4/8">
            {image && image.length > 0 ? (
              <div className="w-[400px] h-[450px]">
                <img src={image[currentPhotoIndex]} alt={name} className="w-[100%] h-[100%] object-cover rounded-lg" />
              </div>
            ) : (
              <div className="w-[400px] h-[450px]">
                <p className="text-center py-48 text-red-500">No Image Available</p>
              </div>
            )}
            {image && image.length != 1 && (
              <div className="flex justify-start mr-4 mt-2">
                <button onClick={() => handlePreviousImage()} className="p-2 bg-green-700 text-white rounded-md mr-2">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button onClick={() => handleNextImage()} className="p-2 bg-green-700 text-white rounded-md">
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between p-4">
          <Link to={`/update-product/${id}`} type="button" className="h-fit px-6 py-2 font-semibold uppercase rounded-xl bg-green-700 hover:bg-white-500 text-white">
            Update
          </Link>
          <button className="border border-green-400 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded" onClick={() => handleClose()}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
