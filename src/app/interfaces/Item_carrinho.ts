import Produto_imagem from "./Produto_imagem";

export default interface Item_carrinho {
  desconto: string;
  id_produto: number
  imagens: Produto_imagem;
  nome: string
  preco: string;
  quantidade: string;
  selecionado: boolean;
}
