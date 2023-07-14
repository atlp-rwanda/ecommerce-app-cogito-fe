import { useEffect, useCallback } from 'react';
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
  const fetchDetails = useCallback(() => {
    dispatch(ViewProduct({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);
  const product = item.state.data;

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <h1 className="text-2xl tracking-tight text-slate-900 font-bold my-8">Product Details</h1>
        <div className="flex flex-col md:flex-row -mx-4 w-[100%] ">
          <div className="md:flex-1 px-4 ">
            <div x-data="{ image: 1 }" x-cloak>
              <div className="rounded-lg bg-gray-100 mb-4">
                <div x-show="image === 1" className="h-50 md:h-64 rounded-lg bg-gray-100 mb-4 flex items-center justify-center py-8">
                  <img src={product.image[0]} alt="Product Image 1" className="max-h-full max-w-full" />
                </div>
                <div className="flex">
                  <div x-show="image === 2" className="focus:outline-none w-full rounded-lg h-24 md:h-32 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                    <img src={product.image[1]} alt="Product Image 2" className="max-h-full max-w-full" />
                  </div>

                  <div x-show="image === 3" className=" focus:outline-none w-full rounded-lg h-24 md:h-32 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                    <img src={product.image[2]} alt="Product Image 3" className="max-h-full max-w-full" />
                  </div>

                  <div x-show="image === 4" className="focus:outline-none w-full rounded-lg h-24 md:h-32 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                    <img src={product.image[3]} alt="Product Image 4" className="max-h-full max-w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-fit md:h-fit group mb-10 px-4 py-6 flex w-full max-w-xs flex-col rounded-lg border border-gray-100 bg-white shadow-md">
            <div className="md:flex-1 px-4">
              <h2 className="mb-2 leading-tight uppercase tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{product.name}</h2>
              <p className="text-gray-500 text-sm">
                By{' '}
                <a href="#" className="text-green-600 hover:underline">
                  E-Cogito
                </a>
              </p>
              <div className="flex items-center space-x-4 my-4">
                <div>
                  <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                    <span className="text-green-900 mr-1 mt-1">$</span>
                    <span className="font-bold text-green-900 text-3xl">{product.price}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-500">{product.description}</p>
              <div className="flex py-4 space-x-4">
                <div className="flex items-center">
                  <div className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 pb-1">
                    <p className="pt-2  block text-xs uppercase text-gray-400 tracking-wide font-semibold">QTY</p>
                    <p>{product.quantity}</p>
                  </div>
                </div>
                <Link to={`/update-product/${product.id}`} type="button" className="h-fit px-6 py-2 font-semibold uppercase rounded-xl bg-green-900 hover:bg-white-500 text-white">
                  update
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
