import Img_produto from "./Img_produto";

export default interface Produto {
  id: number;
  name: string;
  produto_desc: string;
  price: number;
  produto_desconto: number;
  imagem_produto: Img_produto[];
}
