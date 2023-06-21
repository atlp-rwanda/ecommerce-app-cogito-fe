import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  properties: Record<string, any>;
}

const ProfileCard = ({ title, properties }: Props) => {
  const navigate = useNavigate();
  const propertiesArray = Object.entries(properties);
  const handleChangePassword = () => {
    navigate('/UpdatePassword');
  };
  return (
    <>
      <div className="mx-8 my-6 font-bold border-[1px] border-[#C6C4C4] custom-md:w-[40%] md:w-[25%] pl-4 rounded-md">{title}</div>
      <div className="mx-8 mb-10 pl-4 py-6 border-[1px] border-[rgba(0, 0, 0, 0.1)]">
        {propertiesArray.map(([propertyKey, propertyValue]) => {
          if (propertyKey === 'password') {
            return (
              <div key={propertyKey} className="flex mb-2 mt-1">
                <p className="capitalize text-[#A1ACB9] font-bold md:w-[23%] view-profile-card:w-[17%] custom-md:w-[30%]">{propertyKey.replace(/_/g, ' ')}:</p>
                <Button label="Change your password" style="font-bold border-[1px] border-[#C6C4C4] px-3 rounded-md" onClick={handleChangePassword} />
              </div>
            );
          } else if (propertyKey === 'billing_address') {
            return (
              <div key={propertyKey} className="flex mb-2">
                <p className="capitalize text-[#A1ACB9] font-bold  md:w-[23%] view-profile-card:w-[17%] custom-md:w-[30%]">{propertyKey.replace(/_/g, ' ')}:</p>
                <p className="capitalize font-bold">{propertyValue.join(', ')}</p>
              </div>
            );
          } else {
            return (
              <div key={propertyKey} className="flex mb-2">
                <p className="capitalize text-[#A1ACB9] font-bold  md:w-[23%] view-profile-card:w-[17%] custom-md:w-[30%]">{propertyKey.replace(/_/g, ' ')}:</p>
                <p className="capitalize font-bold">{propertyValue}</p>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default ProfileCard;
