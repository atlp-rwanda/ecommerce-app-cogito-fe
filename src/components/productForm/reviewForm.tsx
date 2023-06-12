import React, { useState, ChangeEvent, FormEvent } from 'react';

interface ReviewFormProps {
  productId: number; // Replace 'number' with the appropriate type for your product IDs
  onSubmitReview: (productId: number, reviewData: ReviewData) => void;
}

interface ReviewData {
  rating: number; // Replace 'number' with the appropriate type for your ratings
  title: string;
  comment: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onSubmitReview }) => {
  const [rating, setRating] = useState<number>(5); // default to 5 stars
  const [title, setTitle] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reviewData: ReviewData = {
      rating,
      title,
      comment,
    };
    onSubmitReview(productId, reviewData);
  };

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating:
        <input type="number" min="1" max="5" value={rating} onChange={handleRatingChange} />
      </label>
      <br />
      <label>
        Title:
        <input type="text" value={title} onChange={handleTitleChange} />
      </label>
      <br />
      <label>
        Comment:
        <textarea value={comment} onChange={handleCommentChange} />
      </label>
      <br />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
