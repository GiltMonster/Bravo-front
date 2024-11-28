import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import Item_carrinho from 'src/app/interfaces/Item_carrinho';
import Message from 'src/app/interfaces/Message';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private itensLengthSource = new BehaviorSubject<number>(0); // Inicializa com 0 ou com o valor do carrinho
  itensLength$ = this.itensLengthSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  listaCarrinho(id_user: string): Observable<Item_carrinho[]> {
    return this.http.get<Item_carrinho[]>(`${environment.API_URL_CARRINHO}/${id_user}`).pipe(
      tap(items => {
        this.itensLengthSource.next(items.length);
      })
    );
  }

  addItemCarrinho(usuario_id: string, produto_id: number, quantidade: number) {
    const produto = {
      'usuario_id': usuario_id,
      'produto_id': produto_id,
      'item_qtd': quantidade
    }

    return this.http.post<Message>(`${environment.API_URL_CARRINHO}`, produto).pipe(
      tap(() => {
        this.listaCarrinho(usuario_id).subscribe();
      })
    );
  }

  editCartItem(produto_id: number, quantidade: number, usuario_id: string) {
    const produto = {
      'usuario_id': usuario_id,
      'produto_id': produto_id,
      'item_qtd': quantidade
    }

    return this.http.put<Message>(`${environment.API_URL_CARRINHO}/${usuario_id}`, produto).pipe(
      tap(() => {
        this.listaCarrinho(usuario_id).subscribe();
      })
    );
  }

  removeItemCarrinho(produto_id: number, usuario_id: string) {
    return this.http.delete<Message>(`${environment.API_URL_CARRINHO}/${produto_id}`).pipe(
      tap(() => {
        this.listaCarrinho(usuario_id).subscribe();
      })
    );
  }

}
