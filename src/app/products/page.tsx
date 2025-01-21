"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/src/components/ProductCard";
import { client } from "@/sanity/lib/client";
import { Image } from "sanity";
import CardSkeleton from "@/src/components/Skeleton";

// Fetch product data with the image URL
export const getProductData = async () => {
  const response = await client.fetch(`*[_type == 'products']{
    _id,
    title,
    description,
    image{
      asset->{
        url
      }
    },
    price,
    category->{title}
  }`);
  return response;
};

// Define the interface for a product
interface Product {
  _id: string;
  title: string;
  description: string;
  image: { asset: { url: string } }; // Update to reflect image structure
  price: number;
  category: {
    title: string;
  };
}

const ProductComponent: React.FC = () => {
  const [data, setData] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch the product data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProductData();
        setData(products);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setIsLoading(false); // Set loading to false after data is fetched
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mt-8 px-4 sm:px-8 md:px-16 lg:pl- xl:px-56">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
        {isLoading ? (
          // Render skeleton while loading
          Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : data && data.length > 0 ? (
          // Render product cards when data is available
          data.map((product) => (
            <ProductCard Item={product} key={product._id} />
          ))
        ) : (
          // Fallback if no products are found
          <div>No products found</div>
        )}
      </div>
    </div>
  );
};

export default ProductComponent;
