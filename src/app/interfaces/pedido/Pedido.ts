import Pedido_info from "./Pedido_info"
import Pedido_item from "./Pedido_item"

export default interface Pedido {
  pedido_info: Pedido_info,
  pedido_itens: Pedido_item[]
}
