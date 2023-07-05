import { Button } from '../Button';
import ProfileCard from './profileCard';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { useEffect } from 'react';
import { getProfile } from '../../redux/action/profileAction';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../spinner';
import checkLoggedIn from '../../utils/authorise';

const ViewProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  const { value } = useSelector((state: RootState) => state.profile);

  const userData = value;
  const date = new Date(userData.birthdate);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const personalData = {
    name: userData.name,
    email: userData.email,
    gender: userData.gender,
    phone: userData.phone,
    birthdate: formattedDate,
  };

  const accountData = {
    preferred_language: userData.preferred_language,
    preferred_currency: userData.preferred_currency,
    billing_address: userData.billingAddress,
    status: userData.status,
    password: '',
  };

  const handleClick = () => {
    navigate('/editProfile');
  };
  const isUserLoggedIn = checkLoggedIn();
  console.log()
  if(!isUserLoggedIn){
    navigate('/login');
  }
  console.log('isUserLoggedIn', isUserLoggedIn);
  
  return (
    <>
      <div className="view-profile-welcome:flex view-profile-welcome:justify-between mx-8 mt-10 mb-10">
        <p className="text-lg mb-2 view-profile-welcome:mb-0">
          Welcome back <span className="font-bold">{userData.name.split(' ')[0]}</span>
        </p>
        <Button label="Edit your profile" style="bg-[#003D29] px-8 view-profile-welcome:px-4 py-1 text-white font-medium rounded-md " onClick={handleClick} data-testid="edit_profile" />
      </div>
      {userData?(<>
      <ProfileCard title="Personal Information" properties={personalData} />
      <ProfileCard title="Account data" properties={accountData} />
      </>):(<LoadingSpinner />)}
    </>
  );
};

export default ViewProfile;
