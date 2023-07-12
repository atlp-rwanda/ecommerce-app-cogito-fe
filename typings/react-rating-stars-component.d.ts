declare module 'react-rating-stars-component' {
    import React from 'react';
  
    export interface RatingStarsProps {
      count: number;
      value: number;
      onChange?: (rating: number) => void;
      size?: number;
      activeColor?: string;
      edit?:boolean;
    }
  
    const RatingStars: React.FC<RatingStarsProps>;
    export default RatingStars;
  }
  