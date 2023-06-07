
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InitialMessage from "./components/index";
import Login from "../src/views/Login";
import HomePage from "../src/views/Home";

function App() {
  return (
    <>
      <div></div>
      <div className="bg-primary text-warningColor p-6 text-center">
        <InitialMessage />
      </div>
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
