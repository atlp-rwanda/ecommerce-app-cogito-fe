import { addToWishlist, deleteOne, getWishlist } from '../../redux/action/wishlistAction';
import { useAppDispatch } from '../../redux/hooks/hooks';
import checkLoggedIn from '../../utils/authorise';
import { faFilter, faHeartCirclePlus, faArrowsUpDown, faImage, faHeartCircleXmark, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { WishlistItem, initialState } from '../wishlist/wishlist';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCart } from '../../redux/action/CartAction';
type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string[];
};
type Props = {
  data: Product[];
};
type Response = {
  payload: {
    data: WishlistItem[];
    status: number;
  };
};
const Products = ({ data }: Props) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = checkLoggedIn();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([initialState]);
  const [wishlistProducts, setWishlistProducts] = useState<number[]>([]);
  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState('');
  const [isFiltering, setFiltering] = useState(false);
  useEffect(() => {
    const getData = async () => {
      if (isLoggedIn) {
        const res = (await dispatch(getWishlist())) as Response;
        if (res.payload && (res.payload as { status: number }).status === 200) {
          setWishlist(res.payload.data);
          const wishlistItems = res.payload.data.map((item: WishlistItem) => item.wishlistItem.product.id);
          setWishlistProducts(wishlistItems);
        }
      }
    };
    getData();
  }, [dispatch, isLoggedIn, wishlist, wishlistProducts]);
  const handleAddToWishlist = async (productId: number) => {
    if (isLoggedIn) {
      const res = await dispatch(addToWishlist(productId));
      if (res.payload.status === 200) {
        const newWishlist: Array<number> = wishlistProducts;
        newWishlist.push(productId);
        setWishlistProducts(newWishlist);
      }
    } else {
      navigate('/login');
    }
  };
  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortBy = event.target.value;
    setSortBy(selectedSortBy);
    if (selectedSortBy === 'price') {
      const sortedProducts = [...searchResult].sort((a: Product, b: Product) => a.price - b.price);
      setSearchResult(sortedProducts);
    }
  };
  const handleFilterByPrice = (priceRange: string) => {
    let filteredProducts: Product[];
    setFiltering(true);
    switch (priceRange) {
      case '1-1000':
        filteredProducts = data.filter((product: Product) => product.price >= 1 && product.price <= 1000);
        break;
      case '1001-10000':
        filteredProducts = data.filter((product: Product) => product.price >= 1001 && product.price <= 10000);
        break;
      case '10001-100000':
        filteredProducts = data.filter((product: Product) => product.price >= 10001 && product.price <= 100000);
        break;
      case '100000-above':
        filteredProducts = data.filter((product: Product) => product.price >= 100000);
        break;
      default:
        setFiltering(false);
        filteredProducts = data;
        break;
    }
    setSearchResult(filteredProducts);
  };
  const handleRemoveWishlist = async (productId: number) => {
    const removed = wishlist.filter((item: WishlistItem) => item.wishlistItem.product.id === productId);
    const res = await dispatch(deleteOne(removed[0].wishlistItem.id));
    if (res.payload.status === 200) {
      const newWishlist: Array<number> = wishlistProducts.filter((item) => item !== productId);
      setWishlistProducts(newWishlist);
    }
  };
  
  const handleAddCart = (id: number,productName:string)=>{
    dispatch(addCart(id));
    toast.success(`${productName} has been added to the cart!`, { toastId: 'cartAdded' });
  }
  return (
    <div className="text-center flex flex-col items-center w-[80%] m-auto lm:w-[70%] md:w-[80%] lg:w-[90%]">
      <p className="m-auto text-2xl font-bold mt-6">Explore Products</p>
      <div className="flex flex-row md:relative md:left-48 md:pr-8">
        <div className="flex flex-col justify-start md:flex lg:flex lg:flex-row lg:justify-end mt-8 w-full md:justify-end custom-md:flex-col">
          {localStorage.getItem('token') ? (
            <Link to="/products/recommended">
              <div className="flex items-start justify-start border-[1px] mb-2 border-[#9C9EBA] py-1 px-4  rounded-md md:w-[24] md:mr-2 md:mb-2 hover:bg-green-700">
                <p className="pr-2 text-start">Recommended Products</p>
                <FontAwesomeIcon icon={faUpRightFromSquare} className="hover:text-green-900 mt-1" />
              </div>
            </Link>
          ) : (
            <div></div>
          )}
          {/* Filter */}
          <div className="flex items-start justify-start mb-2 border-[1px] border-[#9C9EBA] py-1 px-4 rounded-md md:w-[24] md:mb-2 md:px-6 md:mr-2">
            <p className="pr-2">Filter</p>
            <FontAwesomeIcon icon={faFilter} className="mt-1" data-testid="faFilter" />
            <select onChange={(e) => handleFilterByPrice(e.target.value)} className="ml-1 focus:outline-none">
              <option value="">All</option>
              <option value="1-1000">1 - 1000</option>
              <option value="1001-10000">1001 - 10000</option>
              <option value="10001-100000">10001 - 100000</option>
              <option value="100000-above">100000 and above</option>
            </select>
          </div>
          {/* Sort */}
          <div className="flex items-start justify-start mb-2 pl-4 border-[1px] border-[#9C9EBA] py-1 rounded-md md:w-[24] w-[96] md:px-6 md:mb-2">
            <p className="pr-2">Sort</p>
            <FontAwesomeIcon icon={faArrowsUpDown} className="mt-1" data-testid="faArrowsUpDown" />
            <select value={sortBy} onChange={handleSortByChange} className="ml-1 focus:outline-none">
              <option value="">None</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-col custom-md:grid custom-md:grid-cols-2 custom-md:gap-5 md:gap-7 lg:grid-cols-3">
        {searchResult.length > 0 || isFiltering
          ? searchResult.map((product) => {
              return (
                <div className="h-[50vh] lg:h-[50vh] ll:h-[60vh] w-full mt-6" key={product.id}>
                  <div className="bg-[#F5F6F6] h-[60%] w-full rounded-lg flex items-center justify-center overflow-hidden hover:bg-green-700">
                    {product.image[0] ? <img src={product.image[0]} alt="" className="w-full h-full mt-6 object-cover object-top hover:w-screen" /> : <FontAwesomeIcon icon={faImage} />}
                  </div>
                  <div className="h-[50%] mt-4">
                    <div className="flex w-full justify-between font-medium">
                      <p>{product.name}</p>
                      <p>${product.price}</p>
                    </div>
                    <p className="text-sm text-left mt-2 text-[#C6C4C4]">{product.description}</p>
                    <div className="flex mt-4 justify-between items-center">
                    <button onClick={() => handleAddCart(product.id,product.name)}  className="border-[1px] border-[#003D29] px-4 py-1 shadow-md rounded-3xl">Add to cart</button>
                      <div className={`border-[1px] border-[#003D29] rounded-3xl shadow-md ${wishlistProducts.includes(product.id) && 'border-[#EA3A5B]'}`}>
                        <FontAwesomeIcon
                          icon={!wishlistProducts.includes(product.id) ? faHeartCirclePlus : faHeartCircleXmark}
                          className={`text-[#003D29] text-xl p-1.5 cursor-pointer ${wishlistProducts.includes(product.id) && 'text-[#EA3A5B]'}`}
                          onClick={() => {
                            {
                              !wishlistProducts.includes(product.id) ? handleAddToWishlist(product.id) : handleRemoveWishlist(product.id);
                            }
                          }}
                          data-testid="add_to_wishlist"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : data.map((product) => {
              return (
                <div className="h-[50vh] lg:h-[50vh] ll:h-[60vh] w-full mt-6" key={product.id}>
                  <div className="bg-[#F5F6F6] h-[60%] w-full rounded-lg flex items-center justify-center overflow-hidden hover:bg-green-700 ">
                    {product.image[0] ? <img src={product.image[0]} alt="" className="w-full h-full mt-6 object-cover object-top hover:w-screen" /> : <FontAwesomeIcon icon={faImage} />}
                  </div>
                  <div className="h-[50%] mt-4">
                    <div className="flex w-full justify-between font-medium">
                      <p>{product.name}</p>
                      <p>${product.price}</p>
                    </div>
                    <p className="text-sm text-left mt-2 text-[#C6C4C4]">{product.description}</p>
                    <div className="flex mt-4 justify-between items-center">
                    <button onClick={() => handleAddCart(product.id,product.name)}  className="border-[1px] border-[#003D29] px-4 py-1 shadow-md rounded-3xl">Add to cart</button>
                      <div className={`border-[1px] border-[#003D29] rounded-3xl shadow-md ${wishlistProducts.includes(product.id) && 'border-[#EA3A5B]'}`}>
                        <FontAwesomeIcon
                          icon={!wishlistProducts.includes(product.id) ? faHeartCirclePlus : faHeartCircleXmark}
                          className={`text-[#003D29] text-xl p-1.5 cursor-pointer ${wishlistProducts.includes(product.id) && 'text-[#EA3A5B]'}`}
                          onClick={() => {
                            {
                              !wishlistProducts.includes(product.id) ? handleAddToWishlist(product.id) : handleRemoveWishlist(product.id);
                            }
                            // dispatch(deleteOne(product.id));
                            // const newProducts = wishlistProducts.filter((item:WishlistItem) => item.wishlistItem.id !== product.id);
                            // setWishlistProducts(newProducts);
                          }}
                          data-testid="add_to_wishlist"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};
export default Products;
