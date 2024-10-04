import Produto_imagem from "./Produto_imagem";

export default interface Product {
  CATEGORIA_ID: number;
  PRODUTO_ATIVO: boolean;
  PRODUTO_DESC: string;
  PRODUTO_DESCONTO: string;
  PRODUTO_ID: number;
  PRODUTO_NOME: string;
  PRODUTO_PRECO: string;
  PRODUTO_VENDAS: number;
  produto_imagem: Produto_imagem[];
}
