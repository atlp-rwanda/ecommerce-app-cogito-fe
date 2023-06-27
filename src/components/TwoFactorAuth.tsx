import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LockIcon from '../assets/authIcons/lock.svg';
import LockError from '../assets/authIcons/lockDanger.svg';
import { useState, ChangeEvent, FormEvent, createRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyOTP } from '../redux/action/TfaAction';
import { RootState } from '../redux/store/store';

function TwoFactorAuth() {
  const { error } = useSelector((state: RootState) => state.tfa);
  const { status } = useSelector((state: RootState) => state.getOtp);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputs = Array.from({ length: 6 }, () => createRef<HTMLInputElement>());
  const [passCode, setPasscode] = useState('');

  useEffect(() => {
    if (status != 200) {
      navigate('/login');
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };

  const onChangeInput = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const nextIndex = index + 1;
    const prevIndex = index - 1;

    if (input.value.length === 0 && prevIndex >= 0) {
      inputs[prevIndex].current?.focus();
    } else if (input.value.length >= input.maxLength && nextIndex < inputs.length) {
      inputs[nextIndex].current?.focus();
    }
    const values = inputs.map((ref) => ref.current!.value).join('');
    setPasscode(values);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = toast.loading('verifying OTP');
    dispatch(verifyOTP(passCode) as any).then((data: any) => {
      if (data.error !== undefined) {
        toast.update(id, {
          render: data.error.message,
          type: 'error',
          isLoading: false,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      } else if (data.payload !== undefined) {
        if (data.payload.status === 200) {
          toast.update(id, {
            render: data.payload.message,
            type: 'success',
            isLoading: false,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
      }
    });
  };

  return (
    <div className="grid grid-cols-12 my-auto bg-sky-200">
      <div className="rounded-xl p-2 sm:px-10 col-start-2 col-end-12 md:col-start-4 md:col-end-10 xl:col-start-5 xl:col-end-9 my-10 pb-10 bg-white">
        <img src={error ? LockError : LockIcon} className="mx-auto my-5 h-28" alt="" />
        <h3 className="text-center font-semibold text-2xl font-mono">Verify OTP {error}</h3>
        <p className="pt-2 text-center font-normal font-mono text-sm">Enter 6-digit code sent to your email</p>
        <form className="mt-10 text-center" onSubmit={handleSubmit}>
          <div className="flex justify-between">
            {inputs.map((value, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                onInput={handleInputChange}
                data-testid={`input-element-${index}`}
                ref={value}
                onChange={onChangeInput.bind(null, index)}
                className={
                  '[&::-webkit-inner-spin-button]:appearance-none w-10 h-12 sm:w-14 sm:h-16  border-2 rounded-md text-center text-4xl focus:outline-none focus:border-sky-600 ' +
                  (error ? 'border-red-500 text-red-500' : 'border-slate-200 text-sky-600')
                }
              />
            ))}
          </div>
          <button
            type="submit"
            className={'mt-10 mb-4 py-4 w-full rounded-md font-bold text-sms ' + (passCode.length < 6 && !error ? 'text-slate-400 bg-slate-200 ' : 'text-white ') + (error ? 'bg-red-500 text-white' : 'bg-sky-600')}
            disabled={passCode.length < 6}
          >
            {error ? 'Wrong Code' : 'Send OTP'}
          </button>
          <a className={'w-full text-center font-bold  text-sm ' + (error ? 'text-red-500' : 'text-sky-600')} href="">
            Resend verification code
          </a>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default TwoFactorAuth;
