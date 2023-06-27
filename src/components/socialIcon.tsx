import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faGoogle,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

const SocialIcons = () => {
  return (
<div className="flex justify-center gap-10 sm:gap-8">
  <a href="#" className="social-icon">
    <FontAwesomeIcon icon={faFacebook} />
  </a>
  <a href="#" className="social-icon">
    <FontAwesomeIcon icon={faInstagram} />
  </a>
  <a href="#" className="social-icon">
    <FontAwesomeIcon icon={faGoogle} />
  </a>
  <a href="#" className="social-icon">
    <FontAwesomeIcon icon={faTwitter} />
  </a>
</div>

  );
};

export default SocialIcons;
