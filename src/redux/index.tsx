import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../redux/store/store';
import VendorPage from '../pages/vendor/VendorPage'; // Replace with the correct path to your VendorPage component file

ReactDOM.render(
  <Provider store={store}>
    <VendorPage />
  </Provider>,
  document.getElementById('root'),
);
