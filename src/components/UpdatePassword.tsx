import { useState, useEffect } from 'react';
import { faLock, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleUpdatePassword } from '../redux/action/UpdatePasswordAction';
import { useAppDispatch } from '../redux/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';

export const UpdatePasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [old_password, setPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const UpdatePasswordState = useSelector((state: RootState) => state.updatePassword);
  useEffect(() => {
    if (UpdatePasswordState.state === 'FULFILLED') {
      // Dispatch action succeeded, handle the logic here
      console.log('password updated successfully!!');
      console.log(UpdatePasswordState.data);
      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
      navigate('/');
    } else if (UpdatePasswordState.state === 'REJECTED') {
      console.log('updating password failed');
      console.log('Error:', UpdatePasswordState.error);
    }
  }, [UpdatePasswordState.state, UpdatePasswordState.status, UpdatePasswordState.data, UpdatePasswordState.error, navigate]);

  const HandleUpdatePasswordEvent = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const userCredentials = {
      old_password,
      new_password,
      confirm_password,
    };
    dispatch(handleUpdatePassword(userCredentials));
  };
  return (
    <>
      <div className="flex flex-col bg-white-90 justify-center border rounded mx-2 sm:mx-10 lg:mx-20 my-5 sm:my-10">
        <h2 className="text-center text-green-700 text-xl">Update Password Page</h2>
        <p className="text-center bg-black-10">Please enter credential details to update your password</p>
        <form className="mx-auto p-4 w-11/12 sm:w-5/6 lg:w-3/5 xl:w-2/5 justify-center" onSubmit={HandleUpdatePasswordEvent}>
          <div className="relative">
            <input
              type="password"
              id="password"
              placeholder="Enter Your Old Password"
              className="border-2 border-green-900 my-3 sm:my-5 rounded-md px-2 py-1 w-full sm:pl-10 focus:outline-none"
              value={old_password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FontAwesomeIcon icon={faLock} className="text-green-900" />
            </div>
          </div>
          <div className="relative">
            <input
              type="password"
              id="newpassword"
              placeholder="Enter Your New Password"
              className="border-2 border-green-900 my-3 sm:my-5 rounded-md px-2 py-1 w-full sm:pl-10 focus:outline-none"
              value={new_password}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FontAwesomeIcon icon={faLock} className="text-green-900" />
            </div>
          </div>
          <div className="relative">
            <input
              type="password"
              id="confirmnewpassword"
              placeholder="Confirm Your New Password"
              className="border-2 border-green-900 my-3 sm:my-5 rounded-md px-2 py-1 w-full sm:pl-10 focus:outline-none"
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FontAwesomeIcon icon={faLock} className="text-green-900" />
            </div>
          </div>
          <div className="relative mb-3 sm:mb-5 rounded-md px-2 py-1 w-full sm:pl-10 h-full">
            {UpdatePasswordState.error && (
              <div className="alert alert-danger text-red-500 text-l italic justify-center pl-1" role="alert">
                {UpdatePasswordState.data}
                <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <FontAwesomeIcon icon={faTriangleExclamation} className="text-red-900 h-5 justify-center" />
                </div>
              </div>
            )}
          </div>
          <button type="submit" className="bg-green-900 text-white rounded px-4 py-2 text-lg hover:bg-green-700 w-full">
            Update Password
          </button>
        </form>
        <div className="grid grid-cols-2 w-11/12 sm:w-5/6 lg:w-3/5 xl:w-2/5 justify-around mx-auto p-4"></div>
        <div className="flex items-center mb-3 sm:mb-4 gap-2 sm:gap-9">
          <hr className="flex-grow border-t border-gray-300 ml-4 sm:ml-28" />
          <span className="mx-2 sm:mx-4 text-gray-700">or continue with</span>
          <hr className="flex-grow border-t border-gray-300 mr-4 sm:mr-28" />
        </div>
        <div className="flex items-center place-content-center mb-3 sm:mb-4 gap-2 sm:gap-20">
          <div className="border rounded p-1">
            <FontAwesomeIcon icon={faGoogle} size="lg" className="text-green-900" />
          </div>
          <div className="border rounded p-1 ml-2 sm:ml-4">
            <FontAwesomeIcon icon={faTwitter} size="lg" className="text-green-900" />
          </div>
          <div className="border rounded p-1 ml-2 sm:ml-4">
            <FontAwesomeIcon icon={faFacebook} size="lg" className="text-green-900" />
          </div>
          <div className="border rounded p-1 ml-2 sm:ml-4">
            <FontAwesomeIcon icon={faInstagram} size="lg" className="text-green-900" />
          </div>
        </div>
      </div>
      ;
    </>
  );
};
