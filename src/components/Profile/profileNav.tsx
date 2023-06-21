import { faCircleUser, faBagShopping, faHeart, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ProfileNav = () => {
  return (
    <div className="border-b-[1px] border-[#003D29] flex items-center py-3 justify-center">
      <div className='flex items-center pr-4 md:pr-6'>
        <FontAwesomeIcon icon={faCircleUser} className="pr-2 md:text-2xl text-[#003D29]" data-testid="profile-icon"/>
        <p className="text-[#003D29] hidden custom-sm:inline">Profile</p>
      </div>
      <div className='flex items-center pr-4 md:pr-6'>
        <FontAwesomeIcon icon={faBagShopping} className="pr-2 md:text-2xl" data-testid="purchases-icon"/>
        <p className='hidden custom-sm:inline'>Purchases</p>
      </div>
      <div className='flex items-center pr-4 md:pr-6'>
        <FontAwesomeIcon icon={faHeart} className="pr-2 md:text-2xl" data-testid="wishlist-icon"/>
        <p className='hidden custom-sm:inline'>Wishlist</p>
      </div>
      <div className='flex items-center'>
        <FontAwesomeIcon icon={faMessage} className="pr-2 md:text-xl" data-testid="chat-icon"/>
        <p className='hidden custom-sm:inline'>Chat</p>
      </div>
    </div>
  );
};

export default ProfileNav;
