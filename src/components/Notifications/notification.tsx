import React, { useRef, useState } from 'react';
import { faBell, faCheckCircle, faCheckDouble, faGear, faDeleteLeft, faMultiply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch } from '../../redux/hooks/hooks';
import { useEffect } from 'react';
import { handleNotifications, handleMarkAllNotificationAsRead, handleMarkNotificationAsRead, handleDeleteSingleNotification } from '../../redux/action/notificationAction';
import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';
import CogitoIcon from '../../assets/favicon-3.png';
import extractDateTime from '../../utils/notificationPassedTime';
import DecodeToken from '../../utils/token';

const NotificationPane: React.FC = () => {
  const userDetails = DecodeToken();
  interface Item {
    id: number;
    subject: string;
    message: string;
    isRead: boolean;
    createdAt: string;
  }
  const dispatch = useAppDispatch();
  const notice = useSelector((state: RootState) => state.notification);
  const [notificationClicked, setNotificationClicked] = useState(false);
  const [markAllRead, setMarkAllRead] = useState(false);
  const [noticeSettings, setNoticeSettings] = useState(false);
  const [unreadNotificationCounter, setUnreadNotificationCounter] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    dispatch(handleNotifications(userDetails));
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node) && !containerRef.current.isSameNode(event.target as Node)) {
        setNotificationClicked(false);
      }
    };
    const handleDocumentClick = (event: MouseEvent) => {
      handleClickOutside(event);
    };
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [dispatch]);
  const notificationData: Item[] = Array.isArray(notice.data) ? notice.data : [];
  const countUnreadNotifications = () => {
    const unreadNotifications = notificationData.filter((item) => !item.isRead);
    const unreadCount = unreadNotifications.length;
    setUnreadNotificationCounter(unreadCount);
    return unreadCount;
  };
  const handleNotificationPane = () => {
    dispatch(handleNotifications(userDetails));
    countUnreadNotifications();
    setNotificationClicked(!notificationClicked);
    dispatch(handleNotifications(userDetails));
    countUnreadNotifications();
  };
  const handleMarkAllRead = () => {
    setMarkAllRead(!markAllRead);
    setNoticeSettings(false);
  };
  const handleNoticeSettings = () => {
    setNoticeSettings(!noticeSettings);
    setMarkAllRead(false);
  };
  const handleSingleNoticeMark = async (notificationId: any) => {
    dispatch(handleNotifications(userDetails));
    setMarkAllRead(false);
    setNoticeSettings(false);
    dispatch(handleMarkNotificationAsRead(notificationId) as any);
    dispatch(handleNotifications(userDetails));
    countUnreadNotifications();
  };
  const handleSingleNoticeDelete = async (notificationId: any) => {
    dispatch(handleNotifications(userDetails));
    setMarkAllRead(false);
    setNoticeSettings(false);
    dispatch(handleDeleteSingleNotification(notificationId) as any);
    dispatch(handleNotifications(userDetails));
    countUnreadNotifications();
  };
  const submitMarkAllAsRead = () => {
    dispatch(handleNotifications(userDetails));
    dispatch(handleMarkAllNotificationAsRead());
    dispatch(handleNotifications(userDetails));
    countUnreadNotifications();
  };
  return (
    <div>
      <div className="items-center md:ml-4 md:mr-10 custom-md:mr-16 w-10 flex justify-between" onClick={handleNotificationPane}>
        {unreadNotificationCounter > 0 ? (
          <p
            className="rounded-full absolute text-sm top-9 mb-8 md:top-10 custom-md:top-9 custom-md:ml-12
          custom-md:mr-2 font-bold bg-green-700 w-5 h-5 text-center ml-2"
          >
            <span>{unreadNotificationCounter}</span>
          </p>
        ) : null}
        <FontAwesomeIcon
          icon={faBell}
          data-testid="faBell"
          className="pr-2 text-2xl md:text-2xl custom-md:text-[1.2rem] custom-md:ml-10
        custom-md:mr-0"
        />
      </div>
      {notificationClicked && (
        <div
          className="flex flex-col absolute top-[10.5%] md:top-[13%] bg-[#fff] p-2 right-1 rounded-l w-[90%] max-h-[40rem]
                    custom-md:w-[65%] md:w-96 "
        >
          <span className="flex flex-row px-5 py-2 justify-between">
            <p className="text-center">Your Notification</p>
            <span>
              <FontAwesomeIcon icon={faCheckDouble} className="text-gray-500 align-bottom text-xl mr-4" onClick={handleMarkAllRead} role="img" name="faCheckDouble" data-testid="faCheckDouble" />
              {markAllRead && (
                <div className="absolute right-6 top-16 border border-green-100 bg-green-100 rounded flex flex-col w-52">
                  <button onClick={submitMarkAllAsRead} className="p-2 m-1 bg-white">
                    Mark All as Read
                  </button>
                </div>
              )}
              <FontAwesomeIcon icon={faGear} className="text-gray-500 align-bottom text-xl mr-4" role="img" onClick={handleNoticeSettings} name="faGear" data-testid="faGear" />
              {noticeSettings && (
                <div className="absolute right-6 top-16 border border-green-100 bg-green-100 rounded flex flex-col w-52 z--10">
                  <button className="p-2 m-1 bg-white">Notification Settings</button>
                  <button className="p-2 m-1 bg-white cursor-not-allowed">Delete All Notifications</button>
                </div>
              )}
              <FontAwesomeIcon icon={faMultiply} className="text-gray-500 align-bottom text-xl mr-4" onClick={handleNotificationPane} role="img" name="faMultiply" data-testid="faMultiply" />
            </span>
          </span>
          <div className="dropdown-content overflow-y-auto">
            <div className="flex flex-col mb-2">
              <span className="w-full" />
            </div>
            <div className="flex flex-col mb-2">
              <div className="">
                <table className="w-full text-sm text-gray-500">
                  <tbody>
                    {notificationData.map((item) => {
                      const createdAt = item.createdAt; // Assuming the field containing the date is named 'updatedAt'
                      const extractedDateTime = extractDateTime(createdAt);
                      return (
                        <tr key={item.id} className={`border-b py-1 my-1 flex flex-row bg-green-100 rounded-xl ${!item.isRead ? 'bg-green-300' : ''}`}>
                          <td className="w-8">
                            <img src={CogitoIcon} alt="cogito" className="rounded-full border border-green-700 p-1 w-8 h-8" />
                          </td>
                          <td className="basis-5/6 flex flex-col">
                            <span className="">
                              <span className="font-bold text-black">{item.subject}: </span>
                              {item.message}
                            </span>
                            <span>{extractedDateTime}</span>
                          </td>
                          <td className="flex flex-col justify-evenly">
                            <FontAwesomeIcon icon={faCheckCircle} className="text-black align-bottom text-xl mr-4  hover:cursor-pointer hover:text-gray-500" onClick={() => handleSingleNoticeMark(item.id)} />
                            <FontAwesomeIcon icon={faDeleteLeft} className="text-black align-bottom text-xl mr-4 hover:cursor-pointer hover:text-gray-500" onClick={() => handleSingleNoticeDelete(item.id)} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <span className="border-2 w-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPane;
