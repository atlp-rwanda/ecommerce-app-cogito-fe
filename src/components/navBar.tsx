import { faPhone, faChevronDown, faMagnifyingGlass, faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from './../assets/Logo.png';

const NavBar = () => {
  return (
    <>
      <div className="bg-[#003D29] text-white px-6 py-1 flex justify-between">
        <div className="flex items-center">
          {/* <FontAwesomeIcon icon="fa-regular fa-phone" /> */}
          <FontAwesomeIcon icon={faPhone} className="pr-1" />
          <p>+250 781 234 8928</p>
        </div>
        <div className="flex items-center">
          <p className="pr-1">Eng</p>
          <FontAwesomeIcon icon={faChevronDown} className="" />
        </div>
      </div>
      <div className="px-6 py-3 border-b-[1px] border-[#003D29] flex items-center justify-between">
        <img src={Logo} alt="logo" className="h-9 w-36 "></img>
        <div className="flex">
          <div className="flex items-center pr-4">
            <p className="pr-1">Category</p>
            <FontAwesomeIcon icon={faChevronDown} className="" />
          </div>
          <p className="pr-4">What’s New</p>
          <p className="pr-4">Contact Us</p>
        </div>
        <div className="border-[1px] border-[#9C9EBA] text-[#9C9EBA] w-[40%] py-1.5 px-3 rounded-3xl flex items-center justify-between">
          <p className="pr-1">Search product</p>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <div className="flex items-center">
          <div className="flex items-center pr-8">
            <FontAwesomeIcon icon={faUser} className="pr-2 text-2xl" />
            <p>James</p>
          </div>
          <FontAwesomeIcon icon={faCartShopping} className="text-2xl" />
        </div>
      </div>
    </>
  );
};

export default NavBar;
