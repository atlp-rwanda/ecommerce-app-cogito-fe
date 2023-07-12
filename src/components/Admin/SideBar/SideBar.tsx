import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
export default function Sidebar() {
  const [isOpen, menu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleCloseMenu = () => {
    menu(!isOpen);
  };
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roleId');
    localStorage.removeItem('User ID');
    navigate('/login');
  };
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <div className="fixed flex flex-col  left-0 w-14 hover:w-64 md:w-64 bg-green-900  h-full text-white transition-all duration-300 border-none z-10 sidebar">
        <div className="overflow-y-auto flex flex-col justify-between flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5 hidden md:block">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-400 uppercase">Cogito</div>
              </div>
            </li>
            <li>
              <a
                href="#"
                className={
                  'relative flex flex-row items-center h-11 focus:outline-none hover:bg-white text-white-600 hover:text-emerald-900  border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6'
                }
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Dashboard</span>
              </a>
            </li>
            <li>
              <Link
                to="/admin/manage/users"
                className={
                  'relative flex flex-row items-center h-11 focus:outline-none hover:bg-white  text-white-600 hover:text-emerald-900  border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6' +
                  (isActive('/admin/manage/users') ? ' bg-white text-emerald-900 border-blue-500' : '')
                }
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Users</span>
              </Link>
            </li>
            <li className="px-5 hidden md:block">
              <div className="flex flex-row items-center mt-5 h-8">
                <div className="text-sm font-light tracking-wide text-gray-400 uppercase">Settings</div>
              </div>
            </li>
            <li>
              <Link
                to="/admin/role/permissions"
                className={
                  'relative flex flex-row items-center h-11 focus:outline-none hover:bg-white  text-white-600 hover:text-emerald-900  border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6' +
                  (isActive('/admin/role/permissions') ? ' bg-white text-emerald-900 border-blue-500' : '')
                }
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2 15h-4v-2h4v2zm0-4h-4v-6h4v6z" />
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Roles & Perms</span>
              </Link>
            </li>
            <li onClick={() => navigate('/')}>
              <a
                href="#"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-white  text-white-600 hover:text-emerald-900 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FontAwesomeIcon icon={faArrowCircleLeft} />
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Visit site</span>
              </a>
            </li>
            <li onClick={logout}>
              <a
                href="#"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-white  text-white-600 hover:text-emerald-900 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    ></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="close_icon flex justify-center pt-5 md:hidden">
        <div className="w-[90%]">
          <div onClick={() => handleCloseMenu()} className={`${isOpen ? 'translate-x-52' : 'translate-x-0'} transition-transform ease-in-out duration-500 flex gap-2 w-[73px] cursor-pointer`}>
            {isOpen ? <i className="material-symbols-rounded">close</i> : <i className="material-symbols-rounded">menu</i>}
            <span>Menu</span>
          </div>
        </div>
      </div>
    </>
  );
}
