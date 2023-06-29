import React, { useState } from 'react';
import { useAppDispatch } from '../redux/hooks/hooks';
import { signup } from '../redux/action/registerAction';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationPage from './confirmationPage';
import { faEnvelope, faLock, faUser, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SocialIcons from '../components/socialIcon';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [registered, setRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/;
    if (!password.match(passwordRegex)) {
      toast.error('Password must be at least eight characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      return;
    }

    if (!agreedToTerms) {
      toast.error('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    setIsLoading(true);

    try {
      await dispatch(signup(formData));
      setRegistered(true);
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred during signup');
      }
    } finally {
      setIsLoading(false);
    }
  };
  if (registered) {
    return <ConfirmationPage email={formData.email} />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg w-full">
        <div className="text-green-900 mb-3">
          <h3 className="text-center text-xl font-bold">SIGN UP</h3>
          <p className="text-center">Create Your Account In Seconds</p>
        </div>
        <div className="relative mb-4">
          <input
            className="text-sm sm:text-base placeholder-gray-500 my-2 sm:my-5 pl-10 px-2 py-1 rounded-lg border-2 border-green-900 w-full py-2 focus:outline-none focus:border-customBlue"
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FontAwesomeIcon icon={faUser} className="text-green-900" />
          </div>
        </div>
        <div className="relative mb-4">
          <input
            className="text-sm sm:text-base placeholder-gray-500 my-2 sm:my-5 pl-10 px-2 py-1 rounded-lg border-2 border-green-900 w-full py-2 focus:outline-none focus:border-customBlue"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FontAwesomeIcon icon={faEnvelope} className="text-green-900" />
          </div>
        </div>
        <div className="relative mb-4">
          <input
            className="text-sm sm:text-base placeholder-gray-500 my-2 sm:my-5 pl-10 pr-10 py-1 rounded-lg border-2 border-green-900 w-full py-2 focus:outline-none focus:border-customBlue"
            id="password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FontAwesomeIcon icon={faLock} className="text-green-900" />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="text-green-900" />
          </div>
        </div>
        <div className="relative mb-4">
          <input
            className="text-sm sm:text-base placeholder-gray-500 my-2 sm:my-5 pl-10 px-2 py-1 rounded-lg border-2 border-green-900 w-full py-2 focus:outline-none focus:border-customBlue"
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FontAwesomeIcon icon={faLock} className="text-green-900" />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="text-green-900" />
          </div>
        </div>
        <div className="align-baseline text-center mb-6">
          <input type="checkbox" className="valid:border-green-500" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} data-testid="terms-checkbox" />
          <label className="pl-2">
            I agree to the{' '}
            <a href="#" className="text-green-900">
              Terms of services
            </a>{' '}
            and{' '}
            <a href="#" className="text-green-900">
              Privacy Policy
            </a>
          </label>
        </div>
        <div className="flex sm:flex-row items-center justify-center mb-4">
          <button
            className="bg-green-900 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 sm:px-10 rounded focus:outline-none focus:shadow-outline mb-4 sm:mb-0 sm:mr-4"
            type="button"
            onClick={handleSignup}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Create an account'}
          </button>
        </div>
        <div>
          <p className="text-center sm:text-left">
            Already a member?{' '}
            <a href="/login" className="text-green-900 font-bold">
              Login
            </a>
          </p>
        </div>
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-800 font-bold">Or Continue With</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <div className="social-icons-container px-10 text-green-900 text-2xl mx-20">
          <SocialIcons />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupForm;
