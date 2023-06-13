import React from "react";
import ConfirmationPage from "../pages/confirmationPage";

interface ConfirmationProps {
  email: string;
}

const Confirmation: React.FC<ConfirmationProps> = ({ email }) => {
  return (
    <div>
      <ConfirmationPage email={email} />
    </div>
  );
};

export default Confirmation;
