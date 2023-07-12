import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { editProfile } from '../../redux/action/editProfileAction';
import { getProfile } from '../../redux/action/profileAction';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/store';
import checkLoggedIn from '../../utils/authorise';

type FormData = {
  name: string;
  email: string;
  gender: string;
  phone: string;
  birthDate: string;
  preferred_language: string;
  preferred_currency: string;
  country: string;
  province: string;
  district: string;
  city: string;
  street: string;
  zip: string;
};

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  const { value } = useSelector((state: RootState) => state.profile) || {
    id: 0,
    name: '',
    email: '',
    gender: '',
    birthdate: '',
    phone: '',
    preferred_language: '',
    preferred_currency: '',
    billingAddress: [''],
    password: '',
    resetToken: '',
    resetTokenExpiry: '',
    roleId: 0,
    lastPasswordUpdate: '',
    confirmationCode: '',
    confirmed: false,
    status: '',
    createdAt: '',
    updatedAt: '',
  };

  const userData = value;
  let date;
  if (userData) {
    date = new Date(userData.birthdate);
  } else {
    date = new Date();
  }
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const [formData, setFormData] = useState<FormData>({
    name: userData?.name || '',
    email: userData?.email || '',
    gender: userData?.gender || '',
    phone: userData?.phone || '',
    birthDate: formattedDate,
    preferred_language: userData?.preferred_language || '',
    preferred_currency: userData?.preferred_currency || '',
    country: userData?.billingAddress[0] || '',
    province: userData?.billingAddress[1] || '',
    district: userData?.billingAddress[2] || '',
    city: userData?.billingAddress[3] || '',
    street: userData?.billingAddress[4] || '',
    zip: userData?.billingAddress[5] || '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { name, email, gender, phone, birthDate, preferred_language, preferred_currency, country, province, district, city, street, zip } = formData;

    if (!name || !email || !gender || !phone || !birthDate || !preferred_language || !preferred_currency || !country || !city) {
      toast.error('Please fill in all fields');
      return;
    }

    const profileObj = {
      name,
      email,
      gender,
      phone,
      birthdate: new Date(birthDate),
      preferredLanguage: preferred_language,
      preferredCurrency: preferred_currency,
      billingAddress: [country, province, district, city, street, zip],
    };

    try {
      await dispatch(editProfile(profileObj));
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred while updating');
      }
    } finally {
      toast.success('Updated successfully', {
        onClose: () => {
          navigate('/profile');
        },
      });
    }
  };

  const isUserLoggedIn = checkLoggedIn();
  if (!isUserLoggedIn) {
    navigate('/login');
  }

  return (
    <>
      <div className="mx-8 mt-10 mb-10 w-[90%] mx-auto	">
        <p className="text-3xl font-bold text-[#253C54] mb-6">Edit Your Profile</p>
        <form onSubmit={handleSubmit}>
          <label className="text-[#A1ACB9] font-medium flex flex-col">
            Full Name
            <input
              className="border-[1px] border-[#DBE4EE] bg-[#F6F9FD] px-3 py-3 rounded-md focus:outline-none text-[#323E50] font-medium text-sm mt-2 "
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              data-testid="fullName"
            />
          </label>
          <br />
          <label className="text-[#A1ACB9] font-medium flex flex-col">
            Email
            <input
              className="border-[1px] border-[#DBE4EE] bg-[#F6F9FD] px-3 py-3 rounded-md focus:outline-none text-[#323E50] font-medium text-sm mt-2 "
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              data-testid="email"
            />
          </label>
          <br />
          <label className="text-[#A1ACB9] font-medium flex flex-col">
            Gender
            <div className="flex items-center justify-between border-[1px] border-[#DBE4EE] bg-[#F6F9FD] px-6 py-3 rounded-md focus:outline-none text-[#323E50] font-medium text-sm mt-2 ">
              <label className="w-1/3">
                <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> Male
              </label>
              <label className="w-1/3">
                <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> Female
              </label>
              <label className="w-1/3">
                <input type="radio" name="gender" value="Prefer not to say" checked={formData.gender === 'Prefer not to say'} onChange={handleChange} /> Prefer not to say
              </label>
            </div>
          </label>
          <br />
          <label className="text-[#A1ACB9] font-medium flex flex-col">
            Phone Number
            <input
              className="border-[1px] border-[#DBE4EE] bg-[#F6F9FD] px-3 py-3 rounded-md focus:outline-none text-[#323E50] font-medium text-sm mt-2 "
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="text-[#A1ACB9] font-medium flex flex-col">
            Birth Date
            <input
              className="border-[1px] border-[#DBE4EE] bg-[#F6F9FD] px-3 py-3 rounded-md focus:outline-none text-[#323E50] font-medium text-sm mt-2 "
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="text-[#A1ACB9] font-medium flex flex-col">
            Preferred Language
            <select
              className="border-[1px] border-[#DBE4EE] bg-[#F6F9FD] px-3 py-3 rounded-md focus:outline-none text-[#323E50] font-medium text-sm mt-2 "
              name="preferred_language"
              value={formData.preferred_language}
              onChange={handleChange}
            >
              <option value="">Select Language</option>
              <option value="english">English</option>
              <option value="french">French</option>
            </select>
          </label>
          <br />
          <label className="text-[#A1ACB9] font-medium flex flex-col">
            Preferred Currency
            <select
              className="border-[1px] border-[#DBE4EE] bg-[#F6F9FD] px-3 py-3 rounded-md focus:outline-none text-[#323E50] font-medium text-sm mt-2 "
              name="preferred_currency"
              value={formData.preferred_currency}
              onChange={handleChange}
            >
              <option value="">Select Currency</option>
              <option value="frw">FRW</option>
              <option value="usd">USD</option>
            </select>
          </label>
          <br />
          <label className="text-[#A1ACB9] font-medium flex flex-col">
            Address
            <input
              type="text"
              name="country"
              value={formData.country}
              placeholder="Country"
              onChange={handleChange}
              className="border-[1px] border-[#DBE4EE] bg-[#F6F9FD] px-3 py-3 rounded-md focus:outline-none text-[#323E50] font-medium text-sm mt-2 "
              data-testid="country"
            />
            <input
              type="text"
              name="province"
              value={formData.province}
              placeholder="Province"
              onChange={handleChange}
              className="border-[1px] border-[#DBE4EE] bg-[#F6F9FD] px-3 py-3 rounded-md focus:outline-none text-[#323E50] font-medium text-sm mt-2 "
              data-testid="province"
            />
            <div className="flex w-full justify-between">
              <input
                type="text"
                name="district"
                value={formData.district}
                placeholder="District"
                onChange={handleChange}
                className="w-[49.7%] border-[1px] border-[#DBE4EE] bg-[#F6F9FD] px-3 py-3 rounded-md focus:outline-none text-[#323E50] font-medium text-sm mt-2 "
                data-testid="district"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                placeholder="City"
                onChange={handleChange}
                className="w-[49.7%] border-[1px] border-[#DBE4EE] bg-[#F6F9FD] px-3 py-3 rounded-md focus:outline-none text-[#323E50] font-medium text-sm mt-2 "
                data-testid="city"
              />
            </div>
            <div className="flex w-full justify-between">
              <input
                type="text"
                name="street"
                value={formData.street}
                placeholder="Street Number"
                onChange={handleChange}
                className="w-[49.7%] border-[1px] border-[#DBE4EE] bg-[#F6F9FD] px-3 py-3 rounded-md focus:outline-none text-[#323E50] font-medium text-sm mt-2 "
                data-testid="street"
              />
              <input
                type="text"
                name="zip"
                value={formData.zip}
                placeholder="Zip Code"
                onChange={handleChange}
                className="w-[49.7%] border-[1px] border-[#DBE4EE] bg-[#F6F9FD] px-3 py-3 rounded-md focus:outline-none text-[#323E50] font-medium text-sm mt-2 "
                data-testid="zip"
              />
            </div>
          </label>
          <Button buttonType="submit" label="Update Profile" style="mt-10 bg-[#0D99FF] text-white font-semibold px-20 py-2 rounded-md" />
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default EditProfile;
