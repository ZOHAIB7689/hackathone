import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

export const getProductsByCategorySlug = async (slug: string) => {
  const products = await client.fetch(
    `*[_type == "products" && category->slug.current == $slug]{
      _id,
      title,
      price,
      image {
        asset->{
          url
        }
      },
      category->{
        title
      }
    }`,
    { slug }
  );
  return products;
};