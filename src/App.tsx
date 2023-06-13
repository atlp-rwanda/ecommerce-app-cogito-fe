
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/views/Login";
import HomePage from "../src/views/Home";

function App() {
  return (
    <>      
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}
export default App;
