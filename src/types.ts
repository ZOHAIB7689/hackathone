export interface Product {
  _id: string;
  title: string;
  price: number;
  image: {
    asset: {
      url: string;
    };
  };
}

export interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  image: {
    asset: {
      url: string;
    };
  };
  products: Product[];
}
