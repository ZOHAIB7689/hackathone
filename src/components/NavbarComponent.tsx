"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import { IoIosHelpCircleOutline } from "react-icons/io";
import Link from "next/link";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="border-b-2 bg-gray-200">
      {/* Section 1: Top Bar */}
      <div className="md:px-56 hidden text-gray-200 md:flex justify-between items-center px-4 py-2 bg-[#272343]">
        <div className="text-sm">✔ Free Shipping On All Orders Over $50</div>
        <div className="flex items-center space-x-6 text-sm">
          <div>Eng</div>
          <Link href="/faqs" className="hover:text-teal-600">
            FAQs
          </Link>
          <div className="flex items-center space-x-1">
            <IoIosHelpCircleOutline size={16} />
            <Link href="/contact" className="hover:text-teal-600">
              Need Help
            </Link>
          </div>
        </div>
      </div>

      {/* Section 2: Logo and Cart */}
      <div className="bg-gray-100 md:px-56 shadow-md border-b border-gray-200 px-4 py-3">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="logo" />
            <span className="text-xl font-bold text-gray-700">Comforty</span>
          </div>

          {/* Desktop: Cart and User */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart">
              <FaShoppingCart
                size={30}
                className="text-gray-700 hover:text-emerald-800"
              />
            </Link>
            <div>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>

          {/* Mobile: Menu Icon and Authentication */}
          <div className="md:hidden flex items-center space-x-4">
            <div >
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
            <FaBars
              size={20}
              onClick={() => setMenuOpen(!menuOpen)}
              className="cursor-pointer text-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Menu and Contact */}
      <div className="hidden md:flex md:px-56 bg-white px-4 py-5">
        <div className="container mx-auto flex justify-between items-center">
          {/* Links */}
          <div className="flex space-x-6 font-thin text-gray-700">
            <Link href="/" className="hover:text-teal-600">
              Home
            </Link>
            <Link href="/products" className="hover:text-teal-600">
              Shop
            </Link>
            <Link href="/singleproduct" className="hover:text-teal-600">
              Product
            </Link>
            <Link href="#" className="hover:text-teal-600">
              Pages
            </Link>
            <Link href="/about" className="hover:text-teal-600">
              About
            </Link>
          </div>

          {/* Contact */}
          <div className="text-gray-700">Contact: (808) 555-0111</div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white py-3 space-y-2 text-gray-700">
          <Link href="/" className="block hover:text-teal-600 text-center">
            Home
          </Link>
          <Link
            href="/products"
            className="block hover:text-teal-600 text-center"
          >
            Shop
          </Link>
          <Link
            href="/singleproduct"
            className="block hover:text-teal-600 text-center"
          >
            Product
          </Link>
          <Link href="#" className="block hover:text-teal-600 text-center">
            Pages
          </Link>
          <Link href="/about" className="block hover:text-teal-600 text-center">
            About
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
