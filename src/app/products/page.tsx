"use client"


import React ,{useEffect , useState} from "react"
import ProductCard from "@/src/components/ProductCard"
import {client} from "@/sanity/lib/client"
import { Image } from "sanity"



export const getProductData = async ()=>{
    const response = await client.fetch(`*[_type == 'products']{
       _id,
       title,
       description,
       image,
       price,
       category ->{title} }`)
       return response
}


interface Product {
    _id:string;
    title:string;
    description:string;
    image:Image;
    price:number;
    discount:number;
    category:{
        title:string
    }
}

const ProductComponent:React.FC =()=>{
  const [data, setData] = useState<Product[] | null>(null);
  const [isloading, setIsloading] = useState<boolean>(true);

  // Fetch the product data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const products = await getProductData();
      setData(products);
    };
    fetchData();
    setIsloading(false)
  }, []);

  return(
     <div className="mt-8 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-36">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
     {isloading ? (
       <div>Loading...</div>
     ) : (
       data && data.length > 0 ? (
         data.map((product) => (
           <ProductCard Item={product} key={product._id} />
         ))
       ) : (
         <div>No products found</div>
       )
     )}
     </div></div>

  )
}


export default ProductComponent