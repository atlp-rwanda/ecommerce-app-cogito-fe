import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../../redux/action/resetPasswordAction';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../../components/Nav/navBar';
import Footer from '../../components/Footer/footer';

const UpdatePasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State variable for password visibility

  const handleNewPasswordChange = (e: { target: { value: SetStateAction<string> } }) => {
    setNewPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    dispatch(updatePassword({ token, newPassword }) as any)
      .then(() => {
        setNewPassword('');
        setLoading(false);
        setTimeout(() => {
          navigate('/login');
        }, 4000);
      })
      .catch((error: any) => {
        setLoading(false);
        return error;
      });
  };

  return (
    <>
      <NavBar />
      <div className="w-full justify-center mx-40 my-20 md:w-full h-full bg-white">
        <div className="flex flex-col items-center h-full">
          <ToastContainer />
          <div className="w-4/5 md:w-1/2 ">
            <form className="mt-10 bg-white shadow-lg rounded-lg p-6 md:w-96 justify-center" onSubmit={handleSubmit}>
              <h1 className="text-2xl font-bold text-customBlue mb-6">Reset Password</h1>
              <div className="flex flex-col mb-6">
                <div className="relative">
                  <div className="absolute top-1/2 transform -translate-y-1/2 left-4 cursor-pointer">
                    <FontAwesomeIcon icon={faLock} className="text-green-900 hover:text-customBlue" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="newPassword"
                    id="newPassword"
                    placeholder="Enter New Password"
                    autoComplete="off"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border-2 border-green-900 w-full py-2 focus:outline-none focus:border-customBlue"
                  />
                  <div className="absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer" onClick={togglePasswordVisibility} data-testid="toggle-password-visibility">
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="text-green-900 hover:text-customBlue" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
                <button className="bg-green-900 rounded-full text-white font-bold py-1 px-6 border-2 border-white hover:bg-green-900 hover:border-green-900 hover:text-white transition-all">
                  <span>{isLoading ? 'Loading...' : 'Submit'}</span>
                </button>
                <button
                  type="button"
                  className="bg-transparent rounded-full text-green-900 font-bold py-1 px-6 border-2 border-green-900 hover:bg-green-900 hover:text-white transition-all"
                  onClick={() => navigate('/login')}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpdatePasswordPage;
