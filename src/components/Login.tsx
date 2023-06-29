import { useEffect, useState } from 'react';
import { faLock, faEnvelope, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleLogin } from '../redux/action/loginAction';
import { loginWithGoogle } from '../redux/action/googleLoginAction';
import { useAppDispatch } from '../redux/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<any>('');
  const loginState = useSelector((state: RootState) => state.login);
  const googleLoginState = useSelector((state: RootState) => state.googleLogin);
  useEffect(() => {
    if (loginState.state === 'FULFILLED') {
      console.log('Login successful!!');
      console.log(loginState.data);
      setEmail('');
      setPassword('');
      navigate('/');
    } else if (loginState.state === 'REJECTED') {
      setError(loginState.data);
      console.log('Login failed');
      console.log('Error:', loginState.data);
    }
    if (googleLoginState.GL_State === 'REJECTED'){
      console.log('Login failed');
      console.log('Error: ', googleLoginState.GL_Error);
    }else if (googleLoginState.GL_State === 'FULFILLED'){
      console.log('Login successful!!');
    }
    if (googleLoginState.GL_State === 'FULFILLED') {
      console.log('Login successful!!');
      console.log('Your Token is: ' ,googleLoginState.GL_Token);
      setEmail('');
      setPassword('');
      navigate('/');
    } else if (googleLoginState.GL_State === 'REJECTED') {
      setError('Error In Google Login');
      console.log('Login failed');
      console.log('Error:', loginState.data);
    }
  }, [loginState.state, loginState.status, loginState.data, loginState.error, navigate, googleLoginState.GL_State, googleLoginState.GL_Error, googleLoginState.GL_Token]);
  const HandleLoginEvent = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const userCredentials = {
      email,
      password,
    };
    if(!email){
      setError('Please Enter Your Email Address')
      return;
    }
    if(!password){
      setError('Please Enter Your Password')
      return;
    }
    if (!email || !password) {
      setError('Please Fill In All Fields')
      return;
    }
    dispatch(handleLogin(userCredentials));
  };
  const handleGoogleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(loginWithGoogle);
    const googleLoginURL = `${import.meta.env.VITE_BN_APP_API_BASE_URL}/auth/google`;
    window.open(
      googleLoginURL,
      "_self",
      "width=500,height=600"
    );
  };
  return (
    <>
        <div className="flex flex-col bg-white-90 justify-center border rounded mx-48 my-10">
          <h2 className="text-center text-green-700 text-xl">Login Page</h2>
          <p className="text-center bg-black-10">Please enter your login details to login</p>
          <form className="mx-auto p-4 w-5/6 justify-center" onSubmit={HandleLoginEvent}>
            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email Address"
                className="border-2 border-green-900 my-5 rounded-md px-2 py-1 w-full pl-10 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-green-900" />
              </div>
            </div>
            <div className="relative">
              <input
                type="password"
                id="password"
                placeholder="Enter Your Password"
                className="border-2 border-green-900 my-5 rounded-md px-2 py-1 w-full pl-10 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FontAwesomeIcon icon={faLock} className="text-green-900" />
              </div>
            </div>
            <div className="relative mb-5 rounded-md px-2 py-1 w-full pl-10 h-full">
              {error && (
                <div className="alert alert-danger text-red-500 text-l italic justify-center pl-1" role="alert">
                  {error}
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <FontAwesomeIcon icon={faTriangleExclamation} className="text-red-900 h-5 justify-center" />
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="keepLoggedIn" className="form-checkbox h-4 w-4 text-green-500" />
              <label htmlFor="keepLoggedIn" className="ml-2 text-gray-700">
                Keep me logged in
              </label>
            </div>

            <button type="submit" className="bg-green-900 text-white rounded px-4 py-2 text-lg hover:bg-green-700 w-full">
              {loginState.loading ? 'Loading...' : 'Login'}
            </button>
          </form>
          <div className="grid grid-cols-2 w-5/6 justify-around mx-auto p-4">
            <p>
              Don't have an acount?
              <a href="/buyer/signup" className="bg-black-500 hover:bg-green-700 font-bold py-2 px-4">
                Signup
              </a>
            </p>
            <p>
              <a href="/reset-password" className="bg-black-500 hover:bg-green-700 font-bold py-2 px-4 italic ">
                Forgot Password?
              </a>
            </p>
          </div>
          <div className="flex items-center mb-4 gap-9">
            <hr className="flex-grow border-t border-gray-300 ml-28" />
            <span className="mx-4 text-gray-700">or continue with</span>
            <hr className="flex-grow border-t border-gray-300 mr-28" />
          </div>
          <div className="flex items-center place-content-center mb-4 gap-20">
            <div className="border rounded p-1">
              <button onClick={handleGoogleLogin}>
                <FontAwesomeIcon icon={faGoogle} size="lg" className="text-green-900" />
              </button>
            </div>
            <div className="border rounded p-1">
              <FontAwesomeIcon icon={faFacebook} size="lg" className="text-green-900" />
            </div>
          </div>
        </div>
      </>
  );
};
