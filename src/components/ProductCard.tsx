"use client"

import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "@/src/features/cart/cartSlice";
import { IoCartOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

// Interface for the product data
export interface Products {
  _id: string;
  title: string;
  description?: string;
  image: {
    asset: {
      url: string;
    };
  };
  price: number;
  category: {
    title: string;
  };
}

const ProductCard: React.FC<{ Item: Products }> = ({ Item }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Handle add to cart action
  const handleAddToCart = (product: Products) => {
    const cartItem = {
      ...product,
      image: {
        asset: {
          url: product.image.asset.url, // Map the product's image URL to the cart item
        },
      },
      quantity: 1,
    };
    dispatch(addItem(cartItem));
  };

  // Handle product navigation to details page
  const handleNavigation = () => {
    router.push(`/product/${Item._id}`);
  };

  return (
    <div onClick={handleNavigation} className="cursor-pointer">
      <div className="border rounded-lg p-2 hover:bg-zinc-50 duration-200 hover:-translate-y-2">
        <div className="w-full h-3/4 overflow-hidden">
          <div className="bg-black w-[200px] rounded-md">
            {/* Replace Image component with img tag for testing */}
            <img
              src={Item.image.asset.url} // Direct image URL from Sanity
              alt={Item.title}
              className="hover:scale-110 hover:opacity-70 duration-200"
              style={{ width: 200, height: 200 }}
            />
          </div>
        </div>
        <div className="flex m-2 justify-between w-full">
          <h1 className="text-sm">{Item.title}</h1>
          <button
            className="mr-2 p-2 rounded-lg duration-200 hover:bg-[#029FAE] font-bold"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(Item);
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
