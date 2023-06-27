import React, { useEffect, useState } from 'react';
import { getEmailProvider } from '@fnando/email-provider-info';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

interface ConfirmationPageProps {
  email: string;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ email }) => {
  const [providerUrl, setProviderUrl] = useState<string>('');

  useEffect(() => {
    const fetchProviderInfo = async () => {
      try {
        const providerInfo = await getEmailProvider(email);
        if (providerInfo && providerInfo.url) {
          setProviderUrl(providerInfo.url);
        }
      } catch (error) {
        console.log('Error fetching email provider information:', error);
      }
    };

    fetchProviderInfo();
  }, [email]);

  const handleEmailClick = () => {
    if (providerUrl) {
      window.open(providerUrl, '_blank');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-purple-100">
<div className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
        Check Your Email for Confirmation
      </h2>
      <p className="whitespace-normal">
        An email has been sent to{' '}
        <a href={`mailto:${email}`} className="text-blue-500 font-bold" onClick={handleEmailClick}>
          {email}
        </a>
        . Please follow the instructions to confirm your account. If you can't find the email, please check your spam folder.
      </p>
    </div>
  </div>
  );
};

export default ConfirmationPage;
