import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../redux/action/resetPasswordAction';
import { useNavigate } from 'react-router-dom';
const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleEmailChange = (e: { target: { value: SetStateAction<string> } }) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    dispatch(resetPassword(email) as any)
      .then(() => {
        setEmail('');
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      <div className="w-full justify-center mx-40 my-20 md:w-full h-full bg-white">
        <div className="flex flex-col items-center h-full">
          <ToastContainer />
          <div className="w-4/5 md:w-1/2 ">
            <form className="mt-10 bg-white shadow-lg rounded-lg p-6 md:w-96 justify-center" onSubmit={handleSubmit}>
              <h1 className="text-2xl font-bold text-customBlue mb-6">Forgot Password?</h1>
              <h6 className="text-1xl font-light text-customBlue mb-8">Reset Your Password</h6>
              <div className="flex flex-col mb-6">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Your Email"
                  autoComplete="off"
                  value={email}
                  onChange={handleEmailChange}
                  className="text-sm sm:text-base placeholder-gray-500 pl-2 pr-4 rounded-lg border-2 border-green-900 w-full py-2 focus:outline-none focus:border-customBlue"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
                <button className="bg-green-900 rounded-full text-white font-bold py-1 px-6 border-2 border-white hover:bg-green-900 hover:border-green-900 hover:text-white transition-all">
                  <span>{isLoading ? 'Loading...' : 'Submit'}</span>
                </button>

                <button className="bg-transparent rounded-full text-green-900 font-bold py-1 px-6 border-2 border-green-900 hover:bg-green-900 hover:text-white transition-all" onClick={() => navigate('/login')}>
                  Cancel
                </button>
              </div>

              <h3 className="my-4 text-gray-500 font-bold text-sm sm:text-base tracking-wide">
                Have Email & Password?{'   '}
                <span className="cursor-pointer text-customBlue hover:text-green-900">
                  <a href="/login" className="text-tertiary underline">
                    Sign in
                  </a>
                </span>
              </h3>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
