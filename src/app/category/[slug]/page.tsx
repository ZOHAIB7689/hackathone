import { getProductsByCategorySlug } from "@/sanity/lib/client"; // Helper to fetch products
import ProductCard from "@/src/components/ProductCard";
import CardSkeleton from "@/src/components/Skeleton"; // Skeleton component
import { notFound } from "next/navigation";

interface Product {
  _id: string;
  title: string;
  price: number;
  image: {
    asset: {
      _type: string;
      _ref: string;
      url: string;
    };
  };
  category: {
    title: string;
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  // Fetch products by category slug
  const products = await getProductsByCategorySlug(params.slug);

  if (!products || products.length === 0) {
    notFound();
  }

  return (
    <div className="mt-8 px-4 sm:px-8 md:px-16 lg:px-56">
      <h1 className="text-3xl font-bold mb-6">{params.slug} Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Loading skeleton while data is fetching */}
        {products.length === 0
          ? Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          : // Render product cards
            products.map((product: Product) => (
              <ProductCard key={product._id} Item={product} />
            ))}
      </div>
    </div>
  );
}
