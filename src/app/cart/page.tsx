"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRegHeart } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import  { addItem, removeItem, clearCart  } from "@/src/features/cart/cartSlice";
import { RootState } from "@/store/store";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { CartItem } from "@/src/features/cart/cartSlice";

interface Product {
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

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items); // Redux cart items
  const [products, setProducts] = useState<Product[]>([]);

  const getProductData = async () => {
    try {
      const response = await client.fetch<Product[]>(`
        *[_type == 'products']{
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
        }
      `);
      setProducts(response);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    getProductData();

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart: CartItem[] = JSON.parse(savedCart);
        parsedCart.forEach((item) => {
          dispatch(addItem(item));
        });
      } catch (error) {
        console.error("Error parsing saved cart:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 md:pl-56 md:pr-36 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-6">Bag</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2 space-y-4">
            {cartItems.map((item) => {
              const product = products.find((prod) => prod._id === item._id);
              if (!product) return null;

              return (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row items-center bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="w-32 h-32 flex-shrink-0">
                    <Image
                      src={product.image.asset.url}
                      alt={product.title}
                      width={128}
                      height={128}
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow md:ml-4">
                    <h2 className="text-lg font-semibold">{product.title}</h2>
                    <p className="text-sm text-gray-500">
                      {product.description}
                    </p>
                    <div className="text-sm text-gray-500 flex space-x-4 mt-1">
                      <p>Category: {product.category.title}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <div className="flex space-x-4 mt-2">
                      <button className="text-gray-500 hover:text-teal-500">
                        <FaRegHeart />
                      </button>
                      <button
                        className="text-gray-500 hover:text-red-500"
                        onClick={() => dispatch(removeItem(item._id))}
                      >
                        <RiDeleteBin5Line />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-lg font-semibold">
                      MRP: ${(product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-gray-500">Subtotal</p>
                <p className="font-semibold">${totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Estimated Delivery & Handling</p>
                <p className="font-semibold">Free</p>
              </div>
              <div className="border-t border-gray-300 my-4"></div>
              <div className="flex justify-between text-lg font-semibold">
                <p>Total</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
            </div>
            <button
              className="w-full mt-4 bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
