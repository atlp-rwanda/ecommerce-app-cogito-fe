import { faPhone, faChevronDown, faMagnifyingGlass, faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from './../../assets/images/Logo.png';
import DecodeToken from '../../utils/token';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState, KeyboardEvent } from 'react';

const NavBar = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log('Search Term:', searchTerm);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  const [selectedLanguage, setSelectedLanguage] = useState('eng');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    console.log(selectedCategory);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const toggleCategoryDropdown = () => {
    setCategoryDropdownOpen(!categoryDropdownOpen);
  };

  const categories = ['Fashion', 'Education products', 'Frozen Foods', 'Beverages', 'Organic Groceries', 'Office Supplies', 'Books', 'Beauty Products', 'Electronic Gadgets', 'Fitness', 'Sneakers'];

  return (
    <>
      <div className="bg-[#003D29] text-white px-6 py-1 flex justify-between">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faPhone} className="pr-1" />
          <p className="custom-md: text-sm md:text-base">+250 781 234 8928</p>
        </div>
        <div className="dropdown w-20">
          <div className="flex items-center justify-end">
            <p className="pr-1 custom-md: text-sm md:text-base">{selectedLanguage === 'eng' ? 'Eng' : 'Fr'}</p>
            <FontAwesomeIcon icon={faChevronDown} className="custom-md: text-sm md:text-base cursor-pointer" onClick={toggleDropdown} data-testid="language-dropdown-button" />
          </div>
          {dropdownOpen && (
            <div className="dropdown-content flex flex-col absolute z-10 bg-[#003D29] py-1 w-28">
              <Button onClick={() => handleLanguageChange('eng')} label="English" style="dropdown-item mb-1" />
              <Button onClick={() => handleLanguageChange('fr')} label="French" style="dropdown-item mb-1" />
            </div>
          )}
        </div>
      </div>
      <div className="px-6 py-3 border-b-[1px] border-[#003D29] flex justify-between">
        <img src={Logo} alt="logo" className="lg:h-9 lg:w-36 md:w-20 md:h-6 md:mr-2 custom-md: w-[6rem] custom-md: h-[1.5rem]"></img>
        <div className="flex">
          <div className="dropdown">
            <div className="flex items-center mr-4 xl:mr-10 md:mr-2">
              <p className="pr-1 custom-md: text-sm md:text-base">Category</p>
              <FontAwesomeIcon className="text-sm cursor-pointer" icon={faChevronDown} onClick={toggleCategoryDropdown} data-testid="category-dropdown-button" />
            </div>
            {categoryDropdownOpen && (
              <div className="dropdown-content flex flex-col mt-2">
             {categories.map((category) => (
              <p key={category} className="category_link mb-1 cursor-pointer" onClick={() => handleCategoryChange(category)}>
                {category}
              </p>
            ))}
              </div>
            )}
          </div>
          <p className="mr-4 xl:mr-10 md:mr-2 custom-md: text-sm md:text-base">What’s New</p>
          <p className="custom-md: text-sm md:text-base custom-md:mr-0">Contact Us</p>
        </div>
        <div className="border-[1px] border-[#9C9EBA] text-[#9C9EBA] xl:w-[40%] md:w-[30%] py-1.5 px-3 lg:px-4 md:mr-2 rounded-3xl flex items-center justify-between custom-md:w-[30%] h-fit">
          <input type="text" className="custom-md:text-sm md:text-base custom-md:mr-2 focus:outline-none w-full" placeholder="Search product" value={searchTerm} onChange={handleInputChange} onKeyDown={handleKeyDown} />
          <FontAwesomeIcon className="text-sm cursor-pointer" icon={faMagnifyingGlass} onClick={handleSearch} data-testid="search-button"  />
        </div>
        <div className="flex h-fit items-center">
          {localStorage.getItem('token') ? (
            (() => {
              const userDetails = DecodeToken();
              console.log(userDetails);

              return (
                <div className="flex items-center lg:mr-8 md:mr-4 custom-md:mr-4">
                  <FontAwesomeIcon icon={faUser} className="pr-2 lg text-2xl md:text-xl custom-md:text-base" />
                  <p className="custom-md:text-sm">{userDetails.name.split(' ')[0]}</p>
                </div>
              );
            })()
          ) : (
            <Button label="Login" style="lg:mr-8 md:mr-4 custom-md:mr-4 font-bold bg-[#003D29] text-white px-6 py-1 rounded-md" onClick={handleClick} />
          )}

          <FontAwesomeIcon icon={faCartShopping} className="text-2xl md:text-xl custom-md: text-base " />
        </div>
      </div>
    </>
  );
};

export default NavBar;
