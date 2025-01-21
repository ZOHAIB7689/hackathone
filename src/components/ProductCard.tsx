"use client";

import { useDispatch } from "react-redux";
import { addItem } from "@/src/features/cart/cartSlice";
import React from "react";
import { Image as newimage } from "sanity"; // Ensure this matches your Sanity setup
import { urlFor } from "@/sanity/lib/image";
import { FC } from "react";
import { IoCartOutline } from "react-icons/io5";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface Products {
  _id: string;
  title: string;
  description?: string;
  image: newimage;
  price: number;
  category: {
    title: string;
  };
}

const ProductCard: FC<{ Item: Products }> = ({ Item }) => {
  const dispatch = useDispatch(); // Correctly use dispatch inside the component
  const router = useRouter(); // Initialize router

  const handleAddToCart = (product: Products) => {
    dispatch(addItem({ ...product, quantity: 1 })); // Dispatch the addItem action
  };

  const handleNavigation = () => {
    router.push("/#"); // Replace with the correct route for product details
  };

  return (
    <div onClick={handleNavigation} className="cursor-pointer">
      <div className="border rounded-lg p-2 hover:bg-zinc-50 duration-200 hover:-translate-y-2">
        <div className="w-full h-3/4 overflow-hidden">
          <div className="bg-black w-[200px] rounded-md">
            <Image
              src={urlFor(Item.image).url()}
              alt={Item.title}
              height={200}
              width={200}
              className="hover:scale-110 hover:opacity-70 duration-200"
            />
          </div>
        </div>
        <div className="flex m-2 justify-between w-full">
          <h1 className="text-sm">{Item.title}</h1>
          <button
            className="mr-2 p-2 rounded-lg duration-200 hover:bg-[#029FAE] font-bold"
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation on button click
              handleAddToCart(Item); // Call the function correctly
            }}
          >
            <IoCartOutline size={24} />
          </button>
        </div>
        <p className="text-lg p-2 font-bold mt-2">${Item.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
