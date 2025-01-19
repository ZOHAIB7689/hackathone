"use client"

import CardSkeleton from "./Skeleton";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";  // Import your ProductCard component
import {client} from "@/sanity/lib/client"
import { Image } from "sanity";

// Fetch product data from the Sanity API
export const getProductData = async () => {
  const response = await client.fetch(`*[_type == 'products']{
       _id,
       title,
       description,
       image,
       price,
       category ->{title} }`);
  return response;
};

// Define the interface for a product
interface Product {
  _id: string;
  title: string;
  description: string;
  image: Image;
  price: number;
  discount: number;
  category: {
    title: string;
  };
}

// FeaturedProductComponent to render the list of featured products
const FeaturedProductComponent: React.FC = () => {
  // Local state to store the fetched products
  const [data, setData] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState <boolean>(true)

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
    <div className="mt-8">
      
      <div className="flex justify-between flex-col touch-pan-x md:flex-row scrollbar-hide max-w-full  gap-6 overflow-auto mt-5">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : data && data.length > 0 ? (
          data.map((product) => (
            <ProductCard Item={product} key={product._id} /> // Pass product data to ProductCard
          ))
        ) : (
          <p>No featured products available.</p> // If no products are found
        )}
      </div>
    </div>
  );
};

export default FeaturedProductComponent;
