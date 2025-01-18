import React from 'react';
import { Card, CardContent, CardFooter } from '@/src/components/ui/card';
import { ShoppingCart } from 'lucide-react';




export default function FeaturedProductComponent() {
  const products = [
    { image: "chair.png", name: "Library Stool Chair", price: "$20" },
    { image: "chair2.png", name: "Library Stool Chair", price: "$20" },
    { image: "chair3.png", name: "Library Stool Chair", price: "$20" },
    { image: "chair4.png", name: "Library Stool Chair", price: "$20" },
    { image: "sec1.png.png", name: "Library Stool Chair", price: "$20" },
    { image: "card.png", name: "Library Stool Chair", price: "$20" },
    { image: "image.png", name: "Library Stool Chair", price: "$20" },
    { image: "chair.png", name: "Library Stool Chair", price: "$20" },
    { image: "sec.png.png", name: "Library Stool Chair", price: "$20" },
    { image: "chair2.png", name: "Library Stool Chair", price: "$20" },
    { image: "chair3.png", name: "Library Stool Chair", price: "$20" },
    { image: "sec2.png.png", name: "Library Stool Chair", price: "$20" },
  ];

  return ( <div>
    <div className="mt-8 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
        {products.map((product, index) => (
          <Card key={index} className="border-none shadow-md">
            <CardContent>
              <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg" />
            </CardContent>
            <CardFooter>
              <div className="flex flex-col items-start">
                <div className="text-lg text-green-600 font-medium">{product.name}</div>
                <div className="flex justify-between w-full items-center mt-2">
                  <div className="text-lg font-bold">{product.price}</div>
                  <button className="btn btn-primary flex items-center p-2 rounded-md hover:bg-[#029FAE]">
                    <ShoppingCart className="mr-2" />
                  </button>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
</div>
       {/* Section 2 */}
       <div className="bg-stone-100 mt-12 flex flex-col items-center py-16">
           {/* Title */}
           <h1 className="text-5xl font-medium text-center mb-8">
               Or Subscribe To The Newsletter
           </h1>

           {/* Input Section */}
           <div className="flex flex-col md:flex-row items-center gap-4 mb-12">
               <input 
                   type="text" 
                   placeholder="Email Address..." 
                   className="w-full md:w-[643px] border-b-2 outline-none border-gray-300 text-lg px-2 py-1" 
               />
               <button 
                   className="text-white bg-black px-8 py-2 text-lg font-medium hover:bg-gray-800 transition duration-300">
                   SUBMIT
               </button>
           </div>

           {/* Instagram Section */}
           <div className="text-center mb-8">
               <p className="text-2xl font-medium">
                   Follow Products And Discounts On Instagram
               </p>
           </div>

           {/* Instagram Images */}
           <div className="grid grid-cols-2 md:grid-cols-6 gap-6 px-6">
               <img src="/sec1.png.png" alt="Product 1" className="w-32 h-32 object-cover rounded-md shadow-md" />
               <img src="/sec.png.png" alt="Product 2" className="w-32 h-32 object-cover rounded-md shadow-md" />
               <img src="/chair2.png" alt="Product 3" className="w-32 h-32 object-cover rounded-md shadow-md" />
               <img src="/chair.png" alt="Product 4" className="w-32 h-32 object-cover rounded-md shadow-md" />
               <img src="/chair3.png" alt="Product 5" className="w-32 h-32 object-cover rounded-md shadow-md" />
               <img src="/sec2.png.png" alt="Product 6" className="w-32 h-32 object-cover rounded-md shadow-md" />
           </div>
       </div>
</div>
  );
}
