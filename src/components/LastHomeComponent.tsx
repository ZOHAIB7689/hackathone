"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { client } from "@/sanity/lib/client";
import CardSkeleton from "./Skeleton"; // Import CardSkeleton component

// Fetch product data from Sanity with the asset URL
export const getProductData = async () => {
  const response = await client.fetch(`*[_type=='products']{
    _id,
    title,
    description,
    image{
      asset->{
        url
      }
    },
    discount, 
    price,
    category->{title}
  }`);
  return response;
};

// Define the Product interface
interface Product {
  _id: string;
  title: string;
  description: string;
  image: { asset: { url: string } }; // Adjusting image to store asset URL
  price: number;
  discount: number;
  category: {
    title: string;
  };
}

export default function LastHome() {
  const [data, setData] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      <div>
        <h1 className="text-4xl font-semibold">Featured Products</h1>
      </div>
      <div className="flex justify-between md:flex-row-reverse flex-col-reverse flex-wrap mt-5">
        {isLoading
          ? // Render skeleton loader while data is being fetched
            Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          : // Render product cards when data is available
            data
              ?.slice(0, 8)
              .map((product) => (
                <ProductCard Item={product} key={product._id} />
              ))}
      </div>
    </div>
  );
}
