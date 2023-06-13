import React from "react";
import UpdatePage from "../components/UpdateProduct";
import NavBar from "../components/nav/navBar";
import Footer from "../components/Footer/footer";
const Update: React.FC = () => {
  return (
    <div>
      <NavBar />
      <UpdatePage />
      <Footer />
    </div>
  );
};
export default Update;