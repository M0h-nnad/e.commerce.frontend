export interface Product {
  name: string;
  onsale: boolean;
  subCategory: string;
  subCategorySub: string;
  brand: string;
  offer: number;
  price: number;
  variants: {
    _id: string;
    id: string;
    color: string;
    src: string;
    sizes: {
      _id: string;
      id: string;
      number: number;
      size: string;
    }[];
  }[];
  createdAt: string;
  updatedAt: string;
  rate: number;
  id: string;
}
