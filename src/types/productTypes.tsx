export type Product = {
    id: number;
    name: string;
    description: string;
    image: string[];
    price: number;
    quantity: number;
    category_id: number;
    vendor_id: number;
    stock: 'In Stock' | 'Out of Stock' | 'Expired';
    expiredAt: Date;
  };
