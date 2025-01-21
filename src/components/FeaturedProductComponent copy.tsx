"use client";

import React, { useEffect, useState, useRef } from "react";
import ProductCard from "./ProductCard"; // Import your ProductCard component
import { client } from "@/sanity/lib/client";
import { Products } from "./ProductCard";
import CardSkeleton from "./Skeleton";

// Fetch product data from the Sanity API
const getProductData = async () => {
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
  imageUrl: string; 
    price: number;
  category: {
    title: string;
  };
}

// FeaturedProductComponent to render the list of featured products
const FeaturedProductComponent: React.FC = () => {
  const [data, setData] = useState<Products[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Ref for the scrollable container
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scrollContainer.current) {
      setIsDragging(true);
      setStartX(e.pageX - scrollContainer.current.offsetLeft);
      setScrollLeft(scrollContainer.current.scrollLeft);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainer.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    scrollContainer.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Fetch product data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProductData();
        setData(products);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mt-8">
      <div
        ref={scrollContainer}
        className="flex justify-between touch-pan-x md:flex-row scrollbar-hide max-w-full gap-6 overflow-auto mt-5 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        style={{ userSelect: "none" }} // Prevent text/image selection
      >
        {isLoading ? (
          // Render skeleton while loading
          Array.from({ length: 4 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : data && data.length > 0 ? (
          // Render product cards when data is available
          data.map((product) => (
            <ProductCard Item={product} key={product._id} /> // Pass product data to ProductCard
          ))
        ) : (
          <p>No featured products available.</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedProductComponent;
