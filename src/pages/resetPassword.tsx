import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../redux/action/resetPasswordAction';
const ResetPasswordPage = () => {
  const dispatch = useDispatch();
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
    <div className="w-full md:w-1/2 h-full bg-white">
      <div className="flex flex-col items-center justify-center h-full">
        <ToastContainer />
        <div className="w-4/5 md:w-1/2">
          <form className="mt-10 shadow-custom p-9 md:w-96 rounded-xl" onSubmit={handleSubmit}>
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
                className="text-sm sm:text-base placeholder-gray-500 pl-2 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-customBlue"
              />
            </div>
            <div className="flex w-full">
              <button
                type="submit"
                className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-tertiary hover:bg-customBlueLight rounded py-2 w-full transition duration-150 ease-in"
              >
                <span className="mr-2 uppercase">{isLoading ? 'Loading...' : 'Submit'}</span>
              </button>
            </div>
            <h3 className="my-4 text-gray-500 font-bold text-sm sm:text-base tracking-wide">
              Have Email & Password?{' '}
              <span className="cursor-pointer text-customBlue hover:text-red-700">
                <a href="#" className="text-tertiary underline">
                  Sign in
                </a>
              </span>
            </h3>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
