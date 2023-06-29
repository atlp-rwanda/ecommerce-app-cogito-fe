import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import InitialMessage from './components/index';
import NavBar from "../src/components/navBar";
import Login from './pages/Login';
import HomePages from './pages/home';
import { LoginSuccess } from './utils/LoginSuccess';

function App() {
  return (
    <>
      <NavBar/>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<HomePages />} />
            <Route path="/login" element={<Login />} />
            <Route path= "/login/success" element={<LoginSuccess />}
          ></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}
export default App;