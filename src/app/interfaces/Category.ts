import Product from "./Product";

export default interface Category {
  CATEGORIA_ID: number;
  CATEGORIA_NOME: string;
  CATEGORIA_DESC: string;
  CATEGORIA_ATIVO: boolean;
  CATEGORIA_IMAGEM: string;
  produtos: Product[];
}
