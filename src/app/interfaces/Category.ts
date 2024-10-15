import Product from "./Product";

export default interface Category {
  id: number;
  nome: string;
  descricao: string;
  img: string;
  produtos: Product[];
}
