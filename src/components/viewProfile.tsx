import { Button } from './Button';
import ProfileCard from './profileCard';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import { useEffect } from 'react';
import { getProfile } from '@/redux/action/profileAction';
import { useNavigate } from "react-router-dom";

const ViewProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  const { value, status, error } = useAppSelector((state) => state.profile);
  console.log('value', value);
  console.log('status', status);
  console.log('error', error);

  if (!value) {
    return null; 
  }

  const userData = value;
  const date = new Date(userData.birthdate);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
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

  const handleClick = () =>{
    navigate("/editProfile");
  }

  return (
    <>
      <div className="flex justify-between mx-8 mt-10 mb-10">
        <p className="text-lg">
          Welcome back <span className="font-bold">{userData.name.split(" ")[0]}</span>
        </p>
        <Button label="Edit your profile" style="bg-[#003D29] px-4 py-1 text-white font-medium rounded-md" onClick={handleClick}/>
      </div>
      <ProfileCard title="Personal Information" properties={personalData} />
      <ProfileCard title="Account data" properties={accountData} />
    </>
  );
};

export default ViewProfile;