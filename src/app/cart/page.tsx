"use client";

import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface CartItem {
  id: number;
  product_id: string;
  quantity: number;
  product: Product;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items from the backend
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/cart", { method: "GET" });
      const data = await res.json();
      console.log("Fetched cart items:", data); // Log the response for debugging
      setCartItems(data.cart || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete an item from the cart
  const deleteCartItem = async (productId: string) => {
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId }),
      });
      if (res.ok) {
        setCartItems((prev) =>
          prev.filter((item) => item.product_id !== productId)
        );
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  // Update the quantity of an item
  const updateQuantity = async (productId: string, increment: boolean) => {
    try {
      const item = cartItems.find((i) => i.product_id === productId);
      if (!item) return;

      const updatedQuantity = increment ? item.quantity + 1 : item.quantity - 1;
      if (updatedQuantity < 1) return;

      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          quantity: updatedQuantity,
        }),
      });

      if (res.ok) {
        setCartItems((prev) =>
          prev.map((i) =>
            i.product_id === productId ? { ...i, quantity: updatedQuantity } : i
          )
        );
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  if (loading) {
    return <div>Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return <div>Your cart is empty!</div>;
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-image">
              <img src={item.product.imageUrl} alt={item.product.title} />
            </div>
            <div className="cart-details">
              <h2>{item.product.title}</h2>
              <p>{item.product.description}</p>
              <p>Price: ${item.product.price}</p>
              <div className="cart-quantity">
                <button onClick={() => updateQuantity(item.product_id, false)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.product_id, true)}>
                  +
                </button>
              </div>
              <p>Total: ${item.product.price * item.quantity}</p>
            </div>
            <div className="cart-actions">
              <button onClick={() => deleteCartItem(item.product_id)}>
                <RiDeleteBin5Line /> Remove
              </button>
              <button>
                <FaRegHeart /> Save for later
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <p>
          Total Items: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        </p>
        <p>
          Total Price: $
          {cartItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          )}
        </p>
      </div>
    </div>
  );
};

export default CartPage;
