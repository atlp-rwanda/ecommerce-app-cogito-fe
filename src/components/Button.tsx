import React from 'react';
import { Link } from 'react-router-dom';

export interface ButtonProp {
  label: string;
  backgroundColor: string;
  to: string
}
export interface ButtonProps {
  label: string;
  style: string;
  buttonType?: "button" | "submit" | "reset";
  onClick?: ()=>void;
}

export const Signup: React.FC<ButtonProp> = ({ label, backgroundColor , to}) => {
  const style = {
    backgroundColor,
    border: 'none',
    padding: `0.7rem 1rem`,
    borderRadius : `5px`,
    color: 'white',
  };
  return (
    <Link to={to} style={style}>
      {label}
    </Link>
  );
};

export const Button: React.FC<ButtonProps> = ({ label, style, buttonType, onClick, ...restProps }) => {
  return (
    <button type={buttonType} className={style} onClick = {onClick} {...restProps}>
      {label}
    </button>
  );
};
