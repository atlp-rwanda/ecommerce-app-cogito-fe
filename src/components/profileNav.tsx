import { faCircleUser, faBagShopping, faHeart, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';


const ProfileNav = () => {
  return (
    <div className="border-b-[1px] border-[#003D29] flex items-center py-3 justify-center">
      <div className='flex items-center pr-6'>
        <FontAwesomeIcon icon={faCircleUser} className="pr-2 text-2xl text-[#003D29]" />
        <p className="text-[#003D29]">Profile</p>
      </div>
      <div className='flex items-center pr-6'>
        <FontAwesomeIcon icon={faBagShopping} className="pr-2 text-2xl" />
        <p>Purchases</p>
      </div>
      <div className='flex items-center pr-6'>
        <FontAwesomeIcon icon={faHeart} className="pr-2 text-2xl" />
        <p>Wishlist</p>
      </div>
      <div className='flex items-center'>
        <FontAwesomeIcon icon={faMessage} className="pr-2 text-xl" />
        <p>Chat</p>
      </div>
    </div>
  );
};

export default ProfileNav;
