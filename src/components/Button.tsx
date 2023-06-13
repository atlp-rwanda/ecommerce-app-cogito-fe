import React from 'react';
export interface ButtonProps {
  label: string;
  style: string;
  buttonType?: "button" | "submit" | "reset";
  onClick?: ()=>void;
}

export const Button: React.FC<ButtonProps> = ({ label, style, buttonType, onClick }) => {
  return (
    <button type={buttonType} className={style} onClick = {onClick}>
      {label}
    </button>
  );
};
