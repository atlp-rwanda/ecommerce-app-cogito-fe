import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/hooks/hooks';
import { ViewProduct } from '../redux/action/ProductAction';
import { RootState } from '../redux/store/store';


const ProductView = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const item = useSelector((state: RootState) => state.viewProduct);
  console.log('my data1', item)
  const fetchDetails = useCallback(() => {
    dispatch(ViewProduct({ id }));
  }, [dispatch, id]);
  console.log('my data2', item)
  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);
  const product = item.state.data;
  console.log('my product', product)

  return (
    <div>
      <h1>Product Details</h1>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr >
            <td>{product.description}</td>
            <td>{product.price}</td>
            <div>
        <h2>Product Images</h2>
        <div className="image-gallery">
          {product.image.map((url, index) => (
            <img key={index} src={url} alt={`Product Image ${index + 1}`} />
          ))}
        </div>
      </div>
          </tr>
          <td>
          <Link to={`/update-product/${product.id}`} className="p-2 text-sm w-full md:w-64 shadow-lg bg-cyan-700 text-slate-50 hover:bg-cyan-500">
                  update
                </Link>
                  </td>
        </tbody>
      </table>
    </div>
  );
};

export default ProductView;
