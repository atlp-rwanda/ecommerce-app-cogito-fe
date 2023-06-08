// Button.tsx

import React from 'react';

export interface ButtonProps {
  label: string;
  backgroundColor: string;
}

export const Button: React.FC<ButtonProps> = ({ label, backgroundColor}) => {
    const style = {
        backgroundColor,
        "border": "none",
        "padding": `0.7rem 1rem`,
        "border-radius": `5px`,
        "color": "white",
      }
  return (
    <button style={style} type="button">
      {label}
    </button>
  );
};
