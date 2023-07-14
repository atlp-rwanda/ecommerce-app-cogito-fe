import { deleteOne, empty, getWishlist } from '../../redux/action/wishlistAction';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { faMagnifyingGlass, faLocationDot, faTrash, faImage, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, KeyboardEvent, ChangeEvent, useEffect } from 'react';
import RatingStars from 'react-rating-stars-component';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export type WishlistItem = {
  wishlistItem: {
    id: number;
    product: {
      id: number;
      name: string;
      image: string[];
      price: number;
    };
  };
  vendor: {
    businessName: string;
    businessLogo: string;
    businessAddress: string;
  };
  averageReview: number;
};

export const initialState: WishlistItem = {
  wishlistItem: {
    id: 0,
    product: {
      id: 0,
      name: '',
      image: [''],
      price: 0,
    },
  },
  vendor: {
    businessName: '',
    businessLogo: '',
    businessAddress: '',
  },
  averageReview: 0,
};

type Response = {
  payload: {
    data: WishlistItem[];
    status: number;
  };
};

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const [updatedWishlist, setUpdatedWishlist] = useState<WishlistItem[]>([initialState]);
  useEffect(() => {
    const retrieveData = async () => {
      const res = (await dispatch(getWishlist())) as Response;
      if (res.payload && (res.payload as { status: number }).status === 200) {
        setUpdatedWishlist(res.payload.data);
      }
    };
    retrieveData();
  }, [dispatch]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermExists, setSearchTermExists] = useState(false);
  const [searchedItem, setSearchedItem] = useState<WishlistItem>(initialState);

  const handleSearch = () => {
    setSearchClicked(!searchClicked);
    const item = updatedWishlist.filter((item: WishlistItem) => item.wishlistItem.product.name.toLowerCase() === searchTerm.toLowerCase());
    if (item[0]) {
      setSearchTermExists(true);
      setSearchedItem(item[0]);
    } else {
      toast.error('No Such item in your wishlist');
    }
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  return (
    <>
      <div className="text-left flex flex-col items-start w-[80%] m-auto lm:w-[70%] md:w-[80%] lg:w-[90%]">
        <p className="text-2xl font-bold mt-8">My Wishlist</p>
        <div className="flex flex-row justify-between mt-4 w-full">
          <div className="flex flex-col justify-start sm:grid sm:grid-cols-2 sm:gap-2 md:grid md:grid-cols-2 md:gap-2 lg:flex lg:flex-row lg:justify-between mt-8 w-full md:justify-end">
            <div className="border-[1px] border-[#9C9EBA] text-[#9C9EBA] py-1.5 px-2 md:mb-2 mb-2 rounded-lg md:w-[24] flex items-center justify-between h-fit mr-0 ll:w-[28vw]">
              <input type="text" className="focus:outline-none w-full text-sm md:text-base" placeholder="Search" value={searchTerm} onChange={handleInputChange} onKeyDown={handleKeyDown} />
              <FontAwesomeIcon className="text-[#9C9EBA] cursor-pointer" icon={faMagnifyingGlass} onClick={handleSearch} data-testid="search-button" />
            </div>
            <Link to="/products/recommended">
              <div className="flex items-start justify-between border-[1px] mb-2 border-[#9C9EBA] py-1 px-4 rounded-md md:w-[24] md:mr-2 md:mb-2 hover:bg-green-700">
                <p className="pr-2 text-start">Recommended Products</p>
                <FontAwesomeIcon icon={faUpRightFromSquare} className="hover:text-green-900 mt-1" />
              </div>
            </Link>
            <Link to="/products">
              <div className="flex items-start justify-between border-[1px] mb-2 border-[#9C9EBA] py-1 px-4  rounded-md md:w-[24] md:mr-2 md:mb-2 hover:bg-green-700">
                <p className="pr-2 text-start">Explore All Products</p>
                <FontAwesomeIcon icon={faUpRightFromSquare} className="hover:text-green-900 mt-1" />
              </div>
            </Link>
            <button
              className="text-sm md:text-base text-[#EA3A5B] py-1 px-3 md:px-4 border-[1px] border-[#EA3A5B] rounded-lg opacity-80 border-opacity-80"
              onClick={() => {
                dispatch(empty());
                setUpdatedWishlist([]);
              }}
            >
              Empty Wishlist
            </button>
          </div>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-7 lg:grid-cols-3">
          {Object.keys(searchedItem).length === 0 || searchTerm === '' ? (
            <>
              {updatedWishlist.map((product: WishlistItem) => {
                return (
                  <div className="relative h-[70vh] lg:h-[50vh] ll:h-[60vh] w-full mt-6 my-10 md:mb-6" key={product.wishlistItem.id}>
                    <div className="bg-[#F5F6F6] h-[60%] w-full rounded-lg flex items-center justify-center overflow-hidden hover:bg-green-700">
                      {product.wishlistItem.product.image[0] ? <img src={product.wishlistItem.product.image[0]} alt="" className="w-full h-full mt-6 object-cover object-top" /> : <FontAwesomeIcon icon={faImage} />}
                    </div>
                    <div className="absolute inset-y-0 left-[8%] top-[50%] h-[70px] w-[70px] rounded-full overflow-hidden mr-1">
                      {product.vendor.businessLogo ? <img src={product.vendor.businessLogo} alt="" className="h-full w-full object-cover" /> : <p>{product.vendor.businessName[0]}</p>}
                    </div>
                    <div className="h-[50%] mt-10 ml-4">
                      <div className="flex w-full justify-between font-medium">
                        <p>{product.wishlistItem.product.name}</p>
                        <p>${product.wishlistItem.product.price}</p>
                      </div>
                      <div className="flex items-center ">
                        <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
                        <p className="text-sm text-left mt-2">{product.vendor.businessAddress}</p>
                      </div>
                      <RatingStars
                        count={5}
                        value={Number(product.averageReview)}
                        onChange={() => {
                          return;
                        }}
                        size={24}
                        activeColor="#003D29"
                        edit={false}
                      />
                      <div className="flex mt-2 justify-between items-center">
                        <button className="border-[1px] border-[#003D29] px-4 py-1 shadow-md rounded-3xl">Add to cart</button>
                        <div className="border-[1px] border-[#EA3A5B] rounded-full shadow-md border-opacity-80">
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="text-[#EA3A5B] px-2 py-1.5 opacity-80"
                            onClick={() => {
                              dispatch(deleteOne(product.wishlistItem.id));
                              setUpdatedWishlist(updatedWishlist.filter((item: WishlistItem) => item.wishlistItem.id !== product.wishlistItem.id));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : searchTermExists ? (
            <div className="relative h-[70vh] lg:h-[50vh] ll:h-[60vh] w-full mt-6 my-10 md:mb-6">
              <div className="bg-[#F5F6F6] h-[60%] w-full rounded-lg flex items-center justify-center overflow-hidden ">
                {searchedItem.wishlistItem.product.image[0] ? <img src={searchedItem.wishlistItem.product.image[0]} alt="" className="w-[100%] mt-6 object-cover object-top" /> : <FontAwesomeIcon icon={faImage} />}
              </div>
              <div className="absolute inset-y-0 left-[8%] top-[50%] h-[70px] w-[70px] rounded-full overflow-hidden mr-1">
                {searchedItem.vendor.businessLogo ? <img src={searchedItem.vendor.businessLogo} alt="" className="h-full w-full object-cover" /> : <p>{searchedItem.vendor.businessName[0]}</p>}
              </div>
              <div className="h-[50%] mt-10 ml-4">
                <div className="flex w-full justify-between font-medium">
                  <p>{searchedItem.wishlistItem.product.name}</p>
                  <p>${searchedItem.wishlistItem.product.price}</p>
                </div>
                <div className="flex items-center ">
                  <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
                  <p className="text-sm text-left mt-2">{searchedItem.vendor.businessAddress}</p>
                </div>
                <RatingStars
                  count={5}
                  value={Number(searchedItem.averageReview)}
                  onChange={() => {
                    return;
                  }}
                  size={24}
                  activeColor="#003D29"
                  edit={false}
                />
                <div className="flex mt-2 justify-between items-center">
                  <button className="border-[1px] border-[#003D29] px-4 py-1 shadow-md rounded-3xl">Add to cart</button>
                  <div className="border-[1px] border-[#EA3A5B] rounded-full shadow-md border-opacity-80">
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-[#EA3A5B] px-2 py-1.5 opacity-80"
                      onClick={() => {
                        dispatch(deleteOne(searchedItem.wishlistItem.id));
                        setUpdatedWishlist(updatedWishlist.filter((item: WishlistItem) => item.wishlistItem.id !== searchedItem.wishlistItem.id));
                        setSearchTermExists(false);
                        setSearchTerm('');
                        setSearchedItem(initialState);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
