"use client";

import { Card, CardHeader, CardContent } from "./ui/card";
import Image from "next/image";
import Link from "next/link"; // Import Link from Next.js
import { client } from "@/sanity/lib/client";
import CardSkeleton from "./Skeleton";
import { useState, useEffect } from "react";

export const getCategories = async () => {
  const response = await client.fetch(`*[_type == 'categories']{
    _id,
    title,
    slug,
    products,
    image{
      asset->{
        url
      }
    }
  }`);
  return response;
};

const TopCategories = () => {
  interface Category {
    _id: string;
    title: string;
    slug: { current: string };
    products: number;
    image: { asset: { url: string } };
  }

  const [categories, setCategories] = useState<Array<Category>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Top Categories
      </h2>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link
                href={`/category/${category.slug.current}`}
                key={category._id}
              >
                {/* Wrap the card in a Link component */}
                <Card className="overflow-hidden cursor-pointer hover:shadow-md">
                  <CardHeader className="p-0">
                    <div className="bg-black w-[300px]">
                      <Image
                        src={category.image.asset.url}
                        alt={category.title}
                        width={300}
                        height={200}
                        className="w-full h-auto hover:opacity-70 object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="text-md font-medium text-gray-800">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {category.products} Products
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <p>No categories available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TopCategories;
