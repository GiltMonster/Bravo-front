import Endereco_pedido from "./Endereco_pedido"

export default interface Pedido_info {
  pedido_id: number,
  endereco_info: Endereco_pedido,
  pedido_data: Date
  status_info: {
    status_id: number,
    status_desc: string
  }
}
