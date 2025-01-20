import { FaRegHeart } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
export default function Cart() {
  const cartItems = [
    {
      id: 1,
      name: "Library Stool Chair",
      description: "Ashen Slate/Cobalt Bliss",
      size: "L",
      quantity: 1,
      price: 99,
      image: "/chair3.png", // First image
    },
    {
      id: 2,
      name: "Library Stool Chair",
      description: "Ashen Slate/Cobalt Bliss",
      size: "l",
      quantity: 1,
      price: 99,
      image: "/sec.png.png", // Second image
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 md:pl-56 md:pr-36 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold mb-6">Bag</h1>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Bag Section */}
          <div className="col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center bg-white p-4 rounded-lg shadow-md"
              >
                {/* Product Image */}
                <div className="w-32 h-32 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-grow md:ml-4">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">{item.description}</p>

                  {/* Size and Quantity in One Line */}
                  <div className="text-sm text-gray-500 flex space-x-4 mt-1">
                    <p>Size: {item.size}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>

                  {/* Wishlist and Delete Below */}
                  <div className="flex space-x-4 mt-2">
                    <button className="text-gray-500 hover:text-teal-500">
                      <FaRegHeart />
                    </button>
                    <button className="text-gray-500 hover:text-red-500">
                      <RiDeleteBin5Line />
                    </button>
                  </div>
                </div>

                {/* Product Price */}
                <div className="flex flex-col items-end">
                  <p className="text-lg font-semibold">MRP: ${item.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-gray-500">Subtotal</p>
                <p className="font-semibold">$198.00</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Estimated Delivery & Handling</p>
                <p className="font-semibold">Free</p>
              </div>
              <div className="border-t border-gray-300 my-4"></div>
              <div className="flex justify-between text-lg font-semibold">
                <p>Total</p>
                <p>$198.00</p>
              </div>
            </div>
            <button className="w-full mt-4 bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition">
              Member Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
