import React from 'react';
import { ReviewForm, ReviewData } from '../../components/productForm/reviewForm'; // Use curly braces to import named exports

interface Product {
  // Define the type for the product here, for example:
  id: number;
  name: string;
  description: string;
  // ... other properties ...
}

interface ProductPageProps {
  product: Product;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  // ... other product-related code ...

  const handleSubmitReview = async (productId: number, reviewData: ReviewData) => {
    try {
      const response = await fetch(`/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        // Handle success (e.g., show a success message)
        console.log('Review submitted successfully!');
      } else {
        // Handle error (e.g., show an error message)
        console.error('Error submitting the review.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {/* ... product details ... */}
      <h2>Leave a Review</h2>
      <ReviewForm productId={product.id} onSubmitReview={handleSubmitReview} />
      {/* Display existing reviews */}
      {/* ... */}
    </div>
  );
};

export default ProductPage;
