export interface Product {
    id: number;
    name: string;
    price: number;
  }
  
  export interface ProductState {
    products: Product[];
    currentProduct: Product | null;
  }