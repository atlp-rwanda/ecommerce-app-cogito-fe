import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import InitialMessage from './components/index';
import NavBar from "../src/components/navBar";
import Login from './pages/Login';
import HomePages from './pages/home';

function App() {
  return (
    <>
      <div></div>
      <div className="bg-primary text-warningColor p-6 text-center">
      {/* <InitialMessage /> */}
      </div>
      <NavBar/>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<HomePages />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}
export default App;