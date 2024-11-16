import Produto_imagem from "./Produto_imagem";

export default interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: string;
  desconto: string;
  estoque: number;
  indisponivel: boolean;
  imagens: Produto_imagem[];
}
