import { useEffect } from "react";
// import { loginWithGoogle } from '../redux/action/loginAction';
// import { useAppDispatch } from '../redux/hooks/hooks';
import { useLocation, useNavigate } from "react-router-dom";

export function LoginSuccess() {
    // const dispatch = useAppDispatch();

    const location = useLocation();
    const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  localStorage.setItem('token', JSON.stringify(token));
  useEffect(() => {
    if(token){
        console.log('Logged In with Google Successfully!!');
    }
    setTimeout(() => {
     navigate('/');
    }, 500);
  });
  return <div></div>;
}
