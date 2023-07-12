import { faPhone, faChevronDown, faMagnifyingGlass, faUser, faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DecodeToken from '../../utils/token';
import Logo from '../../assets/images/Logo.png';
import { Button } from '../Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChangeEvent, useState, KeyboardEvent, useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { getCategories } from '../../redux/action/categoryAction';
import { RootState } from '../../redux/store/store';
import { useSelector } from 'react-redux';
import NotificationPane from '../Notifications/notification';

type Category = {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};
const NavBar = () => {
  const [searchClicked, setSearchClicked] = useState(false);
  const [menuClicked, setMenuClicked] = useState(false);
  const [profileClicked, setProfileClicked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const { value } = useSelector((state: RootState) => state.category) || [];
  const categories = value.map((obj: Category) => obj.name);
  const handleLoginClick = () => {
    navigate('/login');
    setMenuClicked(false);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleMenuClick = () => {
    setMenuClicked(!menuClicked);
  };

  const handleSearch = () => {
    setSearchClicked(!searchClicked);
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
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const toggleCategoryDropdown = () => {
    setProfileClicked(false);
    setCategoryDropdownOpen(!categoryDropdownOpen);
  };
  const handleProfileMenu = () => {
    setCategoryDropdownOpen(false);
    setProfileClicked(!profileClicked);
  };
  const logout = () => {
    setMenuClicked(false);
    setProfileClicked(false);
    localStorage.removeItem('token');
    localStorage.removeItem('roleId');
    localStorage.removeItem('User ID');
    navigate('/login');
  };
  const location = useLocation();
  const isCertainPage = location.pathname === '/';
  return (
    <>
      {!menuClicked ? (
        <>
          <div className={`${categoryDropdownOpen && 'md:h-[100vh] z-20 overflow-hidden	'}`}>
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
            <div className={`px-6 py-3 ${!isCertainPage && 'border-b-[1px] border-[#003D29]'} flex justify-between items-center md:items-start`}>
              <img
                src={Logo}
                alt="logo"
                className="lg:h-9 lg:w-36 md:w-20 md:h-6 custom-md: w-[6rem] custom-md: h-[1.5rem] md: mr-6 lg:mr-10 xl:mr-20 md:mt-3 lg:mt-2 cursor-pointer"
                onClick={() => {
                  navigate('/');
                }}
              ></img>
              <div className="flex items-center md:justify-between md:items-start md:flex-grow">
                <div className={`flex hidden md:flex md:mt-2 lg:mt-2 md:flex-grow md:justify-between md:w-[43%] md:mr-0 md:max-w-[47%] lg:max-w-[40%] xl:lg:max-w-[35%]`}>
                  <div className="dropdown md:max-w-[1/3] relative">
                    <div className="flex items-center mr-4 xl:mr-10 md:mr-2">
                      <div className="flex items-center">
                        <p className="pr-1 custom-md: text-sm md:text-base">Category</p>
                        <FontAwesomeIcon className="text-sm" icon={faChevronDown} data-testid="category-dropdown-button" onClick={toggleCategoryDropdown} />
                      </div>
                      {categoryDropdownOpen && (
                        <div className="hidden md:block absolute left-0 top-[100%] flex flex-col max-h-[60vh] flex-wrap w-[60vw]">
                          <p className="text-2xl font-bold mt-8 mb-4 text-[#b2b2b2]">Explore Our Categories</p>
                          <div className="flex flex-col max-h-[70vh] flex-wrap">
                            {categories.map((category) => (
                              <p key={category} className="category_link mb-2 cursor-pointer text-xl font-bold">
                                {category}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="mr-4 xl:mr-10 md:mr-2 custom-md: text-sm md:text-base">What's New</p>
                  <p className="custom-md: text-sm md:text-base custom-md:mr-0">Contact Us</p>
                </div>
                <div className={`md:mr-0 flex items-center md:items-center md:w-[48%] ${!categoryDropdownOpen && 'md:w-[50%] lg:w-[58%]'}`}>
                  <div className="md:border-[1px] md:border-[#9C9EBA] text-[#9C9EBA] md:w-[100%] py-1.5 px-3 lg:px-4 md:mr-4 rounded-3xl flex items-center justify-between custom-md:w-[30%] h-fit mr-2 custom-md:mr-6 xl:mr-8">
                    <input
                      type="text"
                      className=" hidden md:inline custom-md:text-sm md:text-base custom-md:mr-2 focus:outline-none w-full"
                      placeholder="Search product"
                      value={searchTerm}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                    />
                    <FontAwesomeIcon className="md:text-[#9C9EBA] text-xl text-black cursor-pointer custom-md:text-xl md:text-xl" icon={faMagnifyingGlass} onClick={handleSearch} data-testid="search-button" />
                  </div>
                  <div className="flex h-fit custom-md:flex custom-md:justify: evenly">
                    {localStorage.getItem('token') ? (
                      (() => {
                        const userDetails = DecodeToken();
                        return (
                          <>
                            <FontAwesomeIcon icon={faCartShopping} className="text-xl md:text-xl custom-md:text-[1.2rem] mr-5 custom-md:mr-0" />
                            <NotificationPane />
                            <div className="hidden md:flex items-center lg:mr-8 md:mr-4 custom-md:mr-4 w-20 justify-end" onClick={handleProfileMenu}>
                              <FontAwesomeIcon icon={faUser} className="pr-2 lg text-2xl md:text-xl custom-md:text-base" />
                              <p className="custom-md:text-sm cursor-pointer">{userDetails.name.split(' ')[0]}</p>
                            </div>
                            {profileClicked && (
                              <div className="dropdown-content flex flex-col absolute top-[14%] z-10 bg-[#f6f9fd] py-1 w-28">
                                {localStorage.getItem('roleId') === '1' ? (
                                  <Button
                                    onClick={() => {
                                      setProfileClicked(false);
                                      navigate('/admin/manage/users');
                                    }}
                                    label="Dashboard"
                                    style="dropdown-item mb-1"
                                  />
                                ) : (
                                  ''
                                )}
                                <Button
                                  onClick={() => {
                                    setProfileClicked(false);
                                    navigate('/profile');
                                  }}
                                  label="Profile"
                                  style="dropdown-item mb-1"
                                />
                                <Button onClick={logout} label="Logout" style="dropdown-item mb-1" />
                              </div>
                            )}
                          </>
                        );
                      })()
                    ) : (
                      <div>
                        <Button label="Login" style=" hidden md:inline font-bold bg-[#003D29] text-white px-6 py-1 rounded-md" onClick={handleLoginClick} />
                      </div>
                    )}
                  </div>
                </div>
                <FontAwesomeIcon icon={faBars} onClick={handleMenuClick} className={`text-xl custom-md:text-2xl md:hidden`} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="md:hidden fixed top-0 left-0 z-40 w-screen h-screen bg-[#003D29]">
          <div className="flex justify-end mt-6">
            <FontAwesomeIcon icon={faBars} onClick={handleMenuClick} className="text-white text-2xl mr-4" />
          </div>
          <div className="flex text-white flex-col ml-10 mt-10">
            <div className="dropdown">
              <div className="flex items-center mr-4 mb-4">
                <p className="pr-2 text-2xl font-bold">Category</p>
                <FontAwesomeIcon className="text-2xl cursor-pointer" icon={faChevronDown} data-testid="category-dropdown-button" onClick={toggleCategoryDropdown} />
              </div>
              {categoryDropdownOpen && (
                <div className="dropdown-content flex flex-col mt-2">
                  {categories.map((category, index) => (
                    <p key={category} className={`category_link text-md font-semibold mb-2 cursor-pointer ${index === categories.length - 1 ? 'mb-4' : ''}`}>
                      {category}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <p className="text-2xl font-bold mb-4">What’s New</p>
            <p className="text-2xl font-bold mb-4">Contact Us</p>
            {localStorage.getItem('token') ? (
              <div className="dropdown">
                <div className="flex items-center mr-4 mb-4">
                  <p className="pr-2 text-2xl font-bold">Account</p>
                  <FontAwesomeIcon className="text-2xl cursor-pointer" icon={faChevronDown} onClick={handleProfileMenu} />
                </div>
                {profileClicked && (
                  <div className="dropdown-content flex flex-col mt-2">
                    {localStorage.getItem('roleId') === '1' ? (
                      <Button
                        onClick={() => {
                          setProfileClicked(false);
                          navigate('/admin/manage/users');
                        }}
                        label="Dashboard"
                        style="dropdown-item mb-1"
                      />
                    ) : (
                      ''
                    )}
                    <p
                      onClick={() => {
                        setProfileClicked(false);
                        setMenuClicked(false);
                        navigate('/profile');
                      }}
                      className="dropdown-item text-md font-semibold mb-2 cursor-pointer"
                    >
                      Profile
                    </p>
                    <p onClick={logout} className="dropdown-item text-md font-semibold mb-2 cursor-pointer">
                      Logout
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-2xl font-bold mb-4" onClick={handleLoginClick}>
                Login
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default NavBar;
