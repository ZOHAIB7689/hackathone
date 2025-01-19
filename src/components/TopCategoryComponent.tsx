// components/TopCategories.js
import { Card, CardHeader,CardContent  } from "./ui/card";
import Image from "next/image";

const TopCategories = () => {
  const categories = [
    {
      name: "Wisp Chair",
      products: "1,156 Products",
      image: "/sec.png.png",
    },
    {
      name: "Wooden Chair",
      products: "582 Products",
      image: "/sec1.png.png",
    },
    {
      name: "Desk Chair",
      products: "164 Products",
      image: "/sec2.png.png",
    },
  ];

  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Top Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="bg-black w-[300px]">
                
                <Image
                  src={category.image}
                  alt={category.name}
                  width={300}
                  height={200}
                  className="w-full h-auto hover:opacity-70 object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="text-md font-medium text-gray-800">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600">{category.products}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
