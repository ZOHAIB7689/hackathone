import { NextRequest, NextResponse } from "next/server";
import { db, cartTable } from "@/src/lib/drizzle";
import { eq, and } from "drizzle-orm";
import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

// Fetch cart items for a user
export const GET = async () => {
  const cookiesData = cookies();
  const userIdCookie = cookiesData.get("user_id");

  if (!userIdCookie) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  try {
    // Fetch cart items from the database
    const cartItems = await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.user_id, userIdCookie.value));

    if (cartItems.length === 0) {
      return NextResponse.json({ cart: [] });
    }

    // Extract product IDs from the cart
    const productIds = cartItems.map((item) => item.product_id);

    // Fetch product details from Sanity
    const products = await client.fetch(
      `*[_type == "products" && _id in $productIds]{
        _id,
        title,
        description,
        price,
        "imageUrl": image.asset->_ref
      }`,
      { productIds }
    );

    // Combine cart data with product details
    const cartWithProductDetails = cartItems.map((item) => {
      const product = products.find(
        (p: { _id: string }) => p._id === item.product_id
      );
      return {
        ...item,
        product: {
          ...product,
          imageUrl: urlFor(product?.imageUrl).url(),
        },
      };
    });

    return NextResponse.json({ cart: cartWithProductDetails });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

// Add an item to the cart
export const POST = async (request: NextRequest) => {
  const req = await request.json();
  const cookiesData = cookies();
  let userIdCookie = cookiesData.get("user_id");

  if (!userIdCookie) {
    const uid = uuid();
    cookiesData.set({
      name: "user_id",
      value: uid,
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
    });
    userIdCookie = { name: "user_id", value: uid };
  }

  try {
    // Check if the product already exists in the user's cart
    const existingItem = await db
      .select()
      .from(cartTable)
      .where(
        and(
          eq(cartTable.user_id, userIdCookie?.value ?? ""),
          eq(cartTable.product_id, req.product_id)
        )
      );

    if (existingItem.length > 0) {
      // Update the quantity if the item exists
      const updatedItem = await db
        .update(cartTable)
        .set({
          quantity: existingItem[0].quantity + 1,
        })
        .where(eq(cartTable.id, existingItem[0].id))
        .returning();

      return NextResponse.json({
        message: "Item quantity updated",
        data: updatedItem,
      });
    } else {
      // Add the item if it doesn't exist
      const newItem = await db
        .insert(cartTable)
        .values({
          product_id: req.product_id,
          quantity: 1,
          user_id: userIdCookie?.value ?? "",
        })
        .returning();

      return NextResponse.json({
        message: "Item added to cart",
        data: newItem,
      });
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

// Delete an item from the cart
export const DELETE = async (request: NextRequest) => {
  const { product_id } = await request.json();
  const cookiesData = cookies();
  const userIdCookie = cookiesData.get("user_id");

  if (!userIdCookie) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  try {
    // Delete the item from the cart
    await db
      .delete(cartTable)
      .where(
        and(
          eq(cartTable.user_id, userIdCookie.value),
          eq(cartTable.product_id, product_id)
        )
      );

    return NextResponse.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
