import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Message from 'src/app/interfaces/Message';
import Pedido from 'src/app/interfaces/pedido/Pedido';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(
    private http: HttpClient
  ) { }

  getListaPedidos(id_user: string) {
    return this.http.get<Pedido[]>(`${environment.API_URL_PEDIDO}/${id_user}`);
  }

  finalizarPedido(pedido: any) {
    return this.http.post<Message>(`${environment.API_URL_PEDIDO}`, pedido);
  }

}
