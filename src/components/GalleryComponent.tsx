"use client"

import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { Image as newImage } from "sanity";
import Image from "next/image";

// Define the structure of the Product data
interface Product {
  _id: string;
  image: newImage;
}

// Image URL Builder
const builder = imageUrlBuilder(client);

// Function to generate image URLs
function urlFor(source: newImage): string {
  return builder.image(source).url() || "";
}

const ChairGallery = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch product data
    const fetchProductData = async () => {
      const response: Product[] = await client.fetch(`*[_type=='products']{
        _id,
        image,
        slug,
      }`);
      setProducts(response || []);
      setIsLoading(false);
    };

    fetchProductData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <div className="mt-12 flex flex-col items-center relative px-4 md:px-8 lg:px-16">
      {/* Rotated Text Section */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-32 -rotate-90 origin-center hidden lg:block">
        <p className="text-sm md:text-lg text-gray-700 font-semibold tracking-wide whitespace-nowrap">
          EXPLORE NEW AND POPULAR PRODUCTS
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center w-full">
        {/* Left Section - Main Product */}
        <div className="md:w-1/2 mr-2 flex justify-center items-center mb-8 md:mb-0">
          <div className="overflow-hidden bg-black rounded-lg w-full max-w-md">
            <Image
              src={urlFor(products[4]?.image)}
              alt="Main Product"
              width={400}
              height={400}
              className="object-contain hover:scale-125 scale-105 duration-200 hover:opacity-50 cursor-pointer w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Right Section - Gallery of Other Products */}
        <div className="md:w-1/2 grid grid-cols-2 gap-4 w-full">
          {products.slice(3, 7).map((product, index) => (
            <div
              key={product._id}
              className="overflow-hidden hover:bg-black rounded-lg"
            >
              <Image
                src={urlFor(product.image)}
                alt={`Product ${index + 1}`}
                width={200}
                height={200}
                className="hover:scale-110 duration-200 hover:opacity-70 cursor-pointer object-cover w-full h-full rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChairGallery;
