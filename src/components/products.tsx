import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/hooks/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faHeartCirclePlus, faArrowsUpDown, faImage } from '@fortawesome/free-solid-svg-icons';
import { getAllProducts } from '../redux/action/products';
import { RootState } from '../redux/store/store';
import { Product } from '../types/searchTypes';

const Products = ({ searchProductText }: any) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const { products } = useSelector((state: RootState) => state.allProducts);
  //const products001 = useSelector((state: RootState) => state.search.products);
  const [products001, setSearchResponse] = useState([]);
  //console.log(products001);
  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const [searchTextValue, setSearchTextValue] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    //setSearchResult(products001);
    if (products.items.length > 0 && searchProductText != 'all') {
      setSearchResponse(products.items.filter((result: any) => result.name.toLowerCase().includes(searchProductText.toLowerCase())));
    }
  }, [products.items, searchProductText]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    setSearchTextValue(searchText);

    if (searchText.trim() === '') {
      setSearchResult(products.items);
    } else {
      const filteredProducts = products.items.filter((product: Product) => {
        return product.name.toLowerCase().includes(searchText.toLowerCase()) || product.description.toLowerCase().includes(searchText.toLowerCase()) || product.price.toString().includes(searchText);
      });

      setSearchResult(filteredProducts);
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

    switch (priceRange) {
      case '1-1000':
        filteredProducts = products.items.filter((product: Product) => product.price >= 1 && product.price <= 1000);
        break;
      case '1001-10000':
        filteredProducts = products.items.filter((product: Product) => product.price >= 1001 && product.price <= 10000);
        break;
      case '10001-100000':
        filteredProducts = products.items.filter((product: Product) => product.price >= 10001 && product.price <= 100000);
        break;
      case '100000-above':
        filteredProducts = products.items.filter((product: Product) => product.price >= 100000);
        break;
      default:
        filteredProducts = products.items;
        break;
    }

    setSearchResult(filteredProducts);
  };

  return (
    <div className="text-center flex flex-col items-center w-[80%] m-auto lm:w-[70%] md:w-[80%] lg:w-[90%]">
      <p className="w-full text-start text-2xl font-bold mt-6">{searchProductText === 'all' ? 'Explore Products' : 'Search results'}</p>
      <div className="flex justify-between mt-8 w-full md:justify-end">
        {/* Filter */}
        <div className="flex items-center justify-center border-[1px] border-[#9C9EBA] py-1 w-[49%] rounded-md md:w-fit md:px-6 md:mr-2">
          <p className="pr-2">Filter</p>
          <FontAwesomeIcon icon={faFilter} className="" />
          <select onChange={(e) => handleFilterByPrice(e.target.value)} className="ml-1 focus:outline-none">
            <option value="">All</option>
            <option value="1-1000">1 - 1000</option>
            <option value="1001-10000">1001 - 10000</option>
            <option value="10001-100000">10001 - 100000</option>
            <option value="100000-above">100000 and above</option>
          </select>
        </div>
        {/* Sort */}
        <div className="flex items-center justify-center border-[1px] border-[#9C9EBA] py-1 w-[49%] rounded-md md:w-fit md:px-6">
          <p className="pr-2">Sort</p>
          <FontAwesomeIcon icon={faArrowsUpDown} className="" />
          <select value={sortBy} onChange={handleSortByChange} className="ml-1 focus:outline-none">
            <option value="">None</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-2 md:gap-7 lg:grid-cols-3">
        {searchProductText === 'all'
          ? products.items.map((product: Product) => (
              <div className="h-[70vh] lg:h-[50vh] ll:h-[60vh] w-full mt-6" key={product.id}>
                <div className="bg-[#F5F6F6] h-[60%] w-full rounded-lg flex items-center justify-center overflow-hidden">
                  {product.image && product.image[0] ? <img src={product.image[0]} alt="" className="w-[100%] mt-6 object-cover object-top" /> : <FontAwesomeIcon icon={faImage} />}
                </div>
                <div className="h-[50%] mt-4">
                  <div className="flex w-full justify-between font-medium">
                    <p>{product.name}</p>
                    <p>${product.price}</p>
                  </div>
                  <p className="text-sm text-left mt-2 text-[#C6C4C4]">{product.description}</p>
                  <div className="flex mt-4 justify-between items-center">
                    <button className="border-[1px] border-[#003D29] px-4 py-1 shadow-md rounded-3xl">Add to cart</button>
                    <div className="border-[1px] border-[#003D29] rounded-3xl shadow-md">
                      <FontAwesomeIcon icon={faHeartCirclePlus} className="text-[#003D29] text-xl p-1.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          : products001.map((product: Product) => (
              <div className="h-[70vh] lg:h-[50vh] ll:h-[60vh] w-full mt-6" key={product.id}>
                <div className="bg-[#F5F6F6] h-[60%] w-full rounded-lg flex items-center justify-center overflow-hidden">
                  {product.image && product.image[0] ? <img src={product.image[0]} alt="" className="w-[100%] mt-6 object-cover object-top" /> : <FontAwesomeIcon icon={faImage} />}
                </div>
                <div className="h-[50%] mt-4">
                  <div className="flex w-full justify-between font-medium">
                    <p>{product.name}</p>
                    <p>${product.price}</p>
                  </div>
                  <p className="text-sm text-left mt-2 text-[#C6C4C4]">{product.description}</p>
                  <div className="flex mt-4 justify-between items-center">
                    <button className="border-[1px] border-[#003D29] px-4 py-1 shadow-md rounded-3xl">Add to cart</button>
                    <div className="border-[1px] border-[#003D29] rounded-3xl shadow-md">
                      <FontAwesomeIcon icon={faHeartCirclePlus} className="text-[#003D29] text-xl p-1.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Products;
